import string
from google_auth_oauthlib.flow import Flow

CLIENT_SECRETS_FILE = "./credentials/client_secrets.json"
SCOPES = ['https://www.googleapis.com/auth/youtube']
API_SERVICE_NAME = 'youtube'
API_VERSION = 'v3'


def initialize_flow(**kwargs):
    flow = Flow.from_client_secrets_file(
        CLIENT_SECRETS_FILE, scopes=SCOPES, **kwargs)
    flow.redirect_uri = 'http://localhost:8080/oauth2callback'
    return flow


def get_authorization_url(user_id: string) -> string:
    flow = initialize_flow()
    authorization_url, state = flow.authorization_url(
        access_type='offline', include_granted_scopes='true', state=user_id)
    # return flask.redirect(authorization_url)
    return authorization_url, state
