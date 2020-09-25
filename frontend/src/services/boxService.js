import httpService from './httpService';
import { youtubeService } from './youtubeService';
import { userService } from '../services/userService'
var gGenre = ['Hip-hop', 'Easy', 'Electronic', 'Latin', 'Rock',
    'Pop', 'Classical', 'Alternative', 'Blues', 'Disco', 'Israeli', 'Arabic']

export const boxService = {
    query,
    getById,
    getAllGenres,
    getUsedGenres,
    save,
    update,
    addSong,
    addLike,
    getIsUserLikeBox,
    getEmptyBox,
    addConnectedUser
    // remove,
}

function getAllGenres() {
    return gGenre;
}

function getUsedGenres(boxes) {
    let allGenres = [];
    boxes.forEach(box => {
        allGenres.push(box.genre);
    })
    const genres = [...new Set(allGenres)];
    return genres;
}

async function getById(boxId) {
    return await httpService.get(`box/${boxId}`)
}

async function query(query) {
    query = query || '';
    return await httpService.get(`box${query}`);
}

function getEmptyBox(user) {
    return {
        name: '',
        description: '',
        imgUrl: null,
        likedByUsers: [],
        connectedUsers: [],
        genre: '',
        createdBy: user,
        createdAt: Date.now(),
        songs: [],
        currSong: null,
        viewCount: 0
    }
}

async function save(box) {
    userService.addBox(box);
    return await httpService.post(`box`, box);
}

async function update(box) {
    return await httpService.put(`box/${box._id}`, box)
}

async function addSong(song) {
    const newSong = {
        id: _makeId(),
        youtubeId: song.id.videoId,
        title: youtubeService.titleSimplify(song.snippet.title),
        duration: await youtubeService.getDuration(song.id.videoId),
        imgUrl: song.snippet.thumbnails.high.url,
        }
    return newSong;
}

async function addLike(boxId, user) {
    const box = await getById(boxId);
    var newBox = { ...box };
    var userIdx = getIsUserLikeBox(newBox, user);
    if (userIdx === -1) {
        newBox.likedByUsers.push(user);
    } else {
        newBox.likedByUsers.splice(userIdx, 1)
    }
    update(newBox);
}

function getIsUserLikeBox(currBox, currUser) {
    return currBox.likedByUsers.findIndex(user => user.id === currUser.id)
}

async function addConnectedUser(boxId, minimalUser) {
    const box = await getById(boxId);
    const newBox = { ...box };
    const isUserInBox = newBox.connectedUsers.find(user => user.id === minimalUser.id)
    if (!isUserInBox) {
        newBox.connectedUsers.push(minimalUser);
        // newBox.viewCount++;
        await update(newBox);

        //ToDO:
        // const boxIdx = getById(minimalUser.currBoxId);
        // boxes[boxIdx].connectedUsers.splice() 
    }
}

function _makeId(length = 8) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}
