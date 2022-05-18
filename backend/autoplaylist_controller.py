# -*- coding: utf-8 -*-
import secrets
import traceback

import flask
import google.oauth2.credentials
from flask import request, jsonify, session
from flask_cors import cross_origin

from appconfig import app, cache
from authorization import initialize_flow, get_authorization_url
from create_playlist import create_playlist


@app.route('/')
@cross_origin(supports_credentials=True)
def index():
    if 'YP_AUPL' not in session:
        session['YP_AUPL'] = secrets.token_urlsafe(16)
        response = new_authorization_response(session['YP_AUPL'])
        return jsonify(response), 200

    known_session = session['YP_AUPL']
    cached_credentials = cache.get(known_session)
    if cached_credentials is None or len(cached_credentials) == 0:
        response = new_authorization_response(known_session)
        return jsonify(response), 200

    # Load the credentials from the session.
    credentials = google.oauth2.credentials.Credentials(
        cached_credentials['token'],
        refresh_token=cached_credentials['refresh_token'],
        token_uri=cached_credentials['token_uri'],
        client_id=cached_credentials['client_id'],
        client_secret=cached_credentials['client_secret'],
        scopes=cached_credentials['scopes'])

    if credentials is None or credentials.expired or not credentials.valid:
        auth_url, state = get_authorization_url(known_session)
        cache.set(state, {})
        response = new_authorization_response(known_session)
        return jsonify(response), 200

    keyword = request.args.get("keyword")
    days = int(request.args.get("days"))
    results_per_channel = int(request.args.get("results_per_channel"))

    try:
        playlist_id = create_playlist(keyword=keyword, days=days,
                                      results_per_channel=results_per_channel, credentials=credentials)
        return jsonify({"playlistId": playlist_id}), 201

    except google.auth.exceptions.RefreshError:
        traceback.print_exc()
        auth_url, state = get_authorization_url(known_session)
        cache.set(state, {})
        response = {"authUrl": auth_url}
        return jsonify(response), 200

    except Exception:
        traceback.print_exc()
        return flask.redirect("http://localhost:3000/error")


@app.route('/oauth2callback')
def oauth2callback():
    # Specify the state when creating the flow in the callback so that it can
    # verify the authorization server response.
    authorization_response = request.url
    state = request.args.get("state")
    cached = cache.get(state)
    if cached is not None:
        flow = initialize_flow(state=state)

        # Use the authorization server's response to fetch the OAuth 2.0 tokens.
        flow.fetch_token(authorization_response=authorization_response)

        # Store the credentials in the session.
        credentials = flow.credentials
        cache.set(state, {
            'token': credentials.token,
            'refresh_token': credentials.refresh_token,
            'token_uri': credentials.token_uri,
            'client_id': credentials.client_id,
            'client_secret': credentials.client_secret,
            'scopes': credentials.scopes
        })

        return flask.redirect("http://localhost:3000/authResult")
    else:
        return flask.redirect("http://localhost:3000/error")


def new_authorization_response(user_id):
    auth_url, state = get_authorization_url(user_id)
    cache.set(state, {})
    return {"authUrl": auth_url}
