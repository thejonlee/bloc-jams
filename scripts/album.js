// Example Album
var albumPicasso = {
    title: 'The Colors',
    artist: 'Pablo Picasso',
    label: 'Cubism',
    year: '1881',
    albumArtUrl: 'assets/images/album_covers/01.png',
    songs: [
        { title: 'Blue', duration: '4:26' },
        { title: 'Green', duration: '3:14' },
        { title: 'Red', duration: '5:01' },
        { title: 'Pink', duration: '3:21'},
        { title: 'Magenta', duration: '2:15'}
    ]
};

// Another Example Album
var albumMarconi = {
    title: 'The Telephone',
    artist: 'Guglielmo Marconi',
    label: 'EM',
    year: '1909',
    albumArtUrl: 'assets/images/album_covers/20.png',
    songs: [
        { title: 'Hello, Operator?', duration: '1:01' },
        { title: 'Ring, ring, ring', duration: '5:01' },
        { title: 'Fits in your pocket', duration: '3:21'},
        { title: 'Can you hear me now?', duration: '3:14' },
        { title: 'Wrong phone number', duration: '2:15'}
    ]
};

// My Example Album
var albumBleedAmerican = {
    title: 'Bleed American',
    artist: 'Jimmy Eat World',
    label: 'DreamWorks',
    year: '2001',
    albumArtUrl: 'assets/images/album_covers/12.png',
    songs: [
        { title: 'Bleed American', duration: '3:02' },
        { title: 'A Praise Chorus', duration: '4:03' },
        { title: 'The Middle', duration: '2:46'},
        { title: 'Your House', duration: '4:46' },
        { title: 'Sweetness', duration: '3:40'}
    ]
};

var createSongRow = function(songNumber, songName, songLength) {
    var template =
       '<tr class="album-view-song-item">'
     + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
     + '  <td class="song-item-title">' + songName + '</td>'
     + '  <td class="song-item-duration">' + songLength + '</td>'
     + '</tr>'
     ;

    var $row = $(template);

    var clickHandler = function() {
        var songNumber = $(this).attr('data-song-number');

    	  if (currentlyPlayingSong !== null) {
    		     // Revert to song number for currently playing song because user started playing new song.
    		     var currentlyPlayingCell = $('.song-item-number[data-song-number="' + currentlyPlayingSong + '"]');
    		     currentlyPlayingCell.html(currentlyPlayingSong);
    	  }
    	  if (currentlyPlayingSong !== songNumber) {
    		    // Switch from Play -> Pause button to indicate new song is playing.
    		    $(this).html(pauseButtonTemplate);
    		    currentlyPlayingSong = songNumber;
    	  } else if (currentlyPlayingSong === songNumber) {
    		    // Switch from Pause -> Play button to pause currently playing song.
    		    $(this).html(playButtonTemplate);
    		    currentlyPlayingSong = null;
    	  }
    };

    var onHover = function(event) {
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = songNumberCell.attr('data-song-number');

        if (songNumber !== currentlyPlayingSong) {
            songNumberCell.html(playButtonTemplate);
        }
    };

    var offHover = function(event) {
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = songNumberCell.attr('data-song-number');

        if (songNumber !== currentlyPlayingSong) {
            songNumberCell.html(songNumber);
        }
    };

    // #1 -- similar to querySelector(), finds the element with .song-item-number class
    // event handlers
    $row.find('.song-item-number').click(clickHandler);
    // #2 -- combines mouseover and mouseleave
    $row.hover(onHover, offHover);
    // #3 -- created with event listeners attached
    return $row;
};

var $albumTitle = $('.album-view-title');
var $albumArtist = $('.album-view-artist');
var $albumReleaseInfo = $('.album-view-release-info');
var $albumImage = $('.album-cover-art');
var $albumSongList = $('.album-view-song-list');

var setCurrentAlbum = function(album) {
    $albumTitle.text(album.title);
    $albumArtist.text(album.artist);
    $albumReleaseInfo.text(album.year + ' ' + album.label);
    $albumImage.attr('src', album.albumArtUrl);

    // #3 -- Clear contents of album song list container
    $albumSongList.empty();

    // #4 -- Build list of songs from album Javascript object
    for (var i = 0; i < album.songs.length; i++) {
        var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
        $albumSongList.append($newRow);
    }
};

// Album button templates
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';

// Store state of playing songs
var currentlyPlayingSong = null;

$(document).ready(function() {
    setCurrentAlbum(albumPicasso);

});
