from datetime import datetime
from utils import get_playlist_ids, get_discovery_client, get_videos_from_playlist, get_video_ids
from youtube_client import YoutubeClient


def create_playlist(keyword, days, results_per_channel, credentials):
    print("Authenticating....")
    oauth2_youtube_client = YoutubeClient(credentials)

    print("Searching playlists...")

    subs_responses = oauth2_youtube_client.get_subscriptions()
    playlist_ids = []
    video_ids = []
    for sub_response in subs_responses:
        playlist_ids.extend(get_playlist_ids(sub_response))

    num_playlists = len(playlist_ids)

    print(f"Done. {num_playlists} playlist{'s' if num_playlists != 1 else ''} found.")
    print("Searching videos...")

    # options = get_options()

    discovery_client = get_discovery_client()
    for playlist_id in playlist_ids:
        videos_response = get_videos_from_playlist(client=discovery_client, playlist_id=playlist_id,
                                                   max_results=results_per_channel)
        if videos_response is not None:
            ids = get_video_ids(videos_response, days, keyword)
            video_ids.extend(ids)

    num_videos = len(video_ids)

    print(f"Done. {num_videos} video{'s' if num_videos != 1 else ''} found.")

    if num_videos > 0:
        print(f"Creating new playlist...")

        playlist_title = f"{keyword} Auto Playlist ({datetime.now()})"
        playlist_id = oauth2_youtube_client.initialize_playlist(playlist_title)

        print(f"Done. New playlist: {playlist_title}")
        print(f"Adding videos to playlist...")

        for video_id in video_ids:
            oauth2_youtube_client.add_video_to_playlist(playlist_id, video_id)

        print(f"Done. {num_videos} video{'s' if num_videos != 1 else ''} added to playlist.")

        return playlist_id
    else:
        print("Try increasing the number of results per channel "
              "and/or the number of days for the search")
        return ''
