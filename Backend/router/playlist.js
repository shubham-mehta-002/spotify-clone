const express = require("express");
const router = express.Router();
const passport = require("passport");
const Playlist = require("../models/playlist.model");
const User = require("../models/user.model");
const Song = require("../models/song.model");
router.use(express.json());
const { cookieJWTAuth } = require("../utils/helpers");

// to get all playlists
router.get("/", async (req, res) => {
  try {
    const playlists = await Playlist.find({}).populate({
      path: "owner",
      select: "username _id",
    });

    return res.json({ success: true, playlists });
  } catch (err) {
    return res.json({ success: false, message: err.message });
  }
});

// get my playlists
router.get("/my/playlists", cookieJWTAuth, async (req, res) => {
  const { user } = req;
  try {
    const fetchedUser = await User.findById(user._id).populate(
      "createdPlaylists"
    );
    const userPlaylists = fetchedUser.createdPlaylists;
    return res.json({ success: true, playlists: userPlaylists });
  } catch (err) {
    return res.json({ success: false, message: err.message });
  }
});

// .populate({
//     path:'owner',
//     select:'username'
// })

// creating new playlist
router.post("/create", cookieJWTAuth, async (req, res) => {
  try {
    const { name, thumbnail, collaborators, visibilityMode } = req.body;

    let { user } = req;
    if (!name)
      return res
        .status(301)
        .json({ success: false, message: "Insufficient data" });
    const ownerId = user._id;

    //    console.log(user.createdPlaylists)

    const newPlaylist = {
      name,
      thumbnail: thumbnail ? thumbnail : undefined,
      owner: ownerId,
      collaborators: collaborators.length != 0 ? collaborators : user.username,
      visibilityMode,
    };

    const newPlaylistData = await Playlist.create(newPlaylist); //automatically create and save in cloud

    // finding the user
    const fetchedUser = await User.findById(user._id);
    if (!fetchedUser)
      return res.json({ success: false, message: "User not found " });
    // console.log(fetchedUser.createdPlaylists)
    fetchedUser.createdPlaylists = [
      ...fetchedUser.createdPlaylists,
      newPlaylistData._id,
    ];

    await fetchedUser.save();

    return res.status(200).json({ success: true, playlist: newPlaylistData });
  } catch (err) {
    res.status(400).json({ success: false, err: err.message });
  }
});

// to add songs to playlist
router.post("/add/song", cookieJWTAuth, async (req, res) => {
  try {
    const { user } = req;
    const { playlistId, songId } = req.body;

    const playlist = await Playlist.findById(playlistId);
    if (!playlist)
      return res
        .status(304)
        .json({ success: false, message: "Playlist doesn't exist" });

    if (
      playlist.owner != user._id &&
      !playlist.collaborators.includes(user._id)
    )
      return res.status(400).json({ success: false, message: "not allowed" });

    const song = await Song.findById(songId);
    if (!song)
      return res
        .status(304)
        .json({ success: false, message: "Song doesn't exist" });

    //adding playlist id to song schema

    playlist.songs.push(songId);
    await playlist.save();

    return res.status(200).json({ success: true, playlist: playlist });
  } catch (err) {
    return res.json({ success: false, err: err.message });
  }
});

router.post("/remove/song", cookieJWTAuth, async (req, res) => {
  try {
    const { user } = req;
    const { playlistId, songId } = req.body;

    let playlist = await Playlist.findById(playlistId);
    if (!playlist)
      return res.json({ success: false, message: "Playlist doesn't exist" });

    if (
      playlist.owner != user._id &&
      !playlist.collaborators.includes(user._id)
    )
      return res.status(400).json({ success: false, message: "not allowed" });

    let song = await Song.findById(songId);
    if (!song)
      return res.json({ success: false, message: "Song doesn't exist" });
    console.log(playlist.songs);
    playlist.songs = playlist.songs.filter(
      (playlistSong) => playlistSong._id.toString() !== songId
    );
    // song.playlists = song.playlists.filter(songPlaylist => songPlaylist._id !== playlistId);
    // console.log({playlist})
    await playlist.save();
    // await song.save()
    return res.json({ success: true, playlist });
  } catch (err) {
    console.log(err);
    return res.json({ success: false, message: err.message });
  }
});

// to get songs through playlistId
router.get("/:playlistId", cookieJWTAuth, async (req, res) => {
  try {
    const { playlistId } = req.params;
    const playlist = await Playlist.findById(playlistId).populate({
      path: "songs",
      populate: {
        path: "artist",
      },
    });
    if (!playlist)
      return res
        .status(301)
        .json({ success: false, message: "Playlist not found !" });

    res.status(200).json({ success: true, playlist });
  } catch (err) {
    res.status(400).json({ success: false, err: err.message });
  }
});

module.exports = router;
