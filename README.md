# YouTube AutoPlaylist
Create personalized YouTube playlists from your subscriptions feed based on your preferences, using the following parameters:
* Keyword in video title (e g. titles that contain the word "music")
* How old the video is (e g. videos uploaded in the last 2 days)
* Number of videos looked up per channel (e g. look up the last 10 videos from each channel)

## Table of contents
* [Technologies](#technologies)
* [Setup](#setup)
* [Usage](#usage)

## Technologies
### Backend
* Python 3.10.4
* Flask 2.1.0
* Redis server 5.0.3
* Google API Client for Python 2.47.0
### Frontend
* TypeScript 4.6.4
* React.js 18.1.0
* Material UI 5.7.0

## Setup
Clone or download this repository.

### Backend
1. You need your own authorization credentials from **Google** to use the [**YouTube API**](https://developers.google.com/youtube/v3). Follow this guide to register an app in **Google Cloud Platform**: 
   * https://developers.google.com/youtube/registering_an_application 

2. Insert your API keys and OAuth 2.0 client secrets in the corresponding files contained in **backend/credentials**.

3. You need to have python and pip installed on your computer to run this code:
   * Python: https://docs.python-guide.org/starting/installation/
   * pip: https://pip.pypa.io/en/stable/installation/

4. Open a terminal/command prompt, cd to the **backend** folder and run:
```
pip install -r requirements.txt
```

5. To initialize the server run:
```
python -m main
```
### Frontend
1. You need to have a package manager (like npm) installed on your computer to run this code:
   * npm: https://docs.npmjs.com/downloading-and-installing-node-js-and-npm/
   
2. Open a terminal/command prompt, cd to the **frontend** folder and run:
```
npm install
```
3. To initialize the app run:
```
npm start
```

## Usage
### Main page
#### Complete the filters with your preferences:
<p align="center"><img height="500px" src="https://github.com/ivan-svetlich/YouTube-AutoPlaylist/blob/master/images/youtube_autoplaylist_1.png"/></p>

### OAuth consent
#### Choose an account:
<p align="center"><img height="500px" src="https://github.com/ivan-svetlich/YouTube-AutoPlaylist/blob/master/images/youtube_autoplaylist_2.png"/></p>

#### Authorize YouTube AutoPlaylist to manage your YouTube account:
<p align="center"><img height="500px" src="https://github.com/ivan-svetlich/YouTube-AutoPlaylist/blob/master/images/youtube_autoplaylist_3.png"/></p>

### Search results
#### If videos were found:
<p align="center"><img src="https://github.com/ivan-svetlich/YouTube-AutoPlaylist/blob/master/images/youtube_autoplaylist_6.png"/></p>
#### You can find the new playlist in your YouTube library:
<p align="center"><img height="500px" src="https://github.com/ivan-svetlich/YouTube-AutoPlaylist/blob/master/images/youtube_autoplaylist_8.png"/></p>

#### If the search returned no results:
<p align="center"><img src="https://github.com/ivan-svetlich/YouTube-AutoPlaylist/blob/master/images/youtube_autoplaylist_7.png"/></p>
