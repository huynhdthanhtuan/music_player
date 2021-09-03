// Khai báo biến
const PLAYER_STORAGE_KEY = 'HDTT';
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const playlist = $('.playlist');
const currentSongName = $('.current-song-name');
const cd = $('.cd');
const cdThumb = $('.cd-thumb');
const togglePlayBtn = $('.btn.btn-toggle-play');
const playBtn = $('.icon-play');
const pauseBtn = $('.icon-pause');
const repeatBtn = $('.btn.btn-repeat');
const randomBtn = $('.btn.btn-random');
const audio = $('#audio');
const progressInput = $('#progress');
const previousBtn = $('.btn.btn-prev');
const nextBtn = $('.btn.btn-next');


// Đối tượng chứa toàn bộ thông tin và chức năng của ứng dụng
var app = {
    songs: [
        {
            "name": "Âm Thầm Bên Em",
            "singer": "Sơn Tùng M-TP",
            "image": "./assest/img/1.png",
            "audio": "./assest/audio/1.mp3"
        },
        {
            "name": "Anh Không Sao Đâu",
            "singer": "Chi Dân",
            "image": "./assest/img/2.png",
            "audio": "./assest/audio/2.mp3"
        },
        {
            "name": "Bay Giữa Ngân Hà",
            "singer": "Nam Cường",
            "image": "./assest/img/3.png",
            "audio": "./assest/audio/3.mp3"
        },
        {
            "name": "Câu Hẹn Câu Thề",
            "singer": "Đình Dũng",
            "image": "./assest/img/4.png",
            "audio": "./assest/audio/4.mp3"
        },
        {
            "name": "Cơn Mưa Ngang Qua",
            "singer": "Sơn Tùng M-TP",
            "image": "./assest/img/5.png",
            "audio": "./assest/audio/5.mp3"
        },
        {
            "name": "Đom Đóm",
            "singer": "Jack",
            "image": "./assest/img/6.png",
            "audio": "./assest/audio/6.mp3"
        },
        {
            "name": "Dừng Thương",
            "singer": "DatKaa",
            "image": "./assest/img/7.png",
            "audio": "./assest/audio/7.mp3"
        },
        {
            "name": "Em Của Ngày Hôm Qua",
            "singer": "Sơn Tùng M-TP",
            "image": "./assest/img/8.png",
            "audio": "./assest/audio/8.mp3"
        },
        {
            "name": "Em Luôn Ở Trong Tâm Trí Anh",
            "singer": "The Men",
            "image": "./assest/img/9.png",
            "audio": "./assest/audio/9.mp3"
        },
        {
            "name": "Già Cùng Nhau Là Được",
            "singer": "Tùng TeA ft. PC",
            "image": "./assest/img/10.png",
            "audio": "./assest/audio/10.mp3"
        },
        {
            "name": "Im Lặng",
            "singer": "LK",
            "image": "./assest/img/11.png",
            "audio": "./assest/audio/11.mp3"
        },
        {
            "name": "L.I.P",
            "singer": "LK",
            "image": "./assest/img/12.png",
            "audio": "./assest/audio/12.mp3"
        },
        {
            "name": "Mây Lang Thang",
            "singer": "Tùng TeA ft. PC",
            "image": "./assest/img/13.png",
            "audio": "./assest/audio/13.mp3"
        },
        {
            "name": "Nắng Ấm Xa Dần",
            "singer": "Sơn Tùng M-TP",
            "image": "./assest/img/14.png",
            "audio": "./assest/audio/14.mp3"
        },
        {
            "name": "Người Có Thương",
            "singer": "DatKaa",
            "image": "./assest/img/15.png",
            "audio": "./assest/audio/15.mp3"
        },
        {
            "name": "Nơi Đâu Tìm Thấy Em",
            "singer": "Chu Bin",
            "image": "./assest/img/16.png",
            "audio": "./assest/audio/16.mp3"
        },
        {
            "name": "Sài Gòn Hôm Nay Mưa",
            "singer": "JSOL ft. Hoàng Duyên",
            "image": "./assest/img/17.png",
            "audio": "./assest/audio/17.mp3"
        },
        {
            "name": "Tát Nước Đầu Đình",
            "singer": "Lynk Lee ft. Binz",
            "image": "./assest/img/18.png",
            "audio": "./assest/audio/18.mp3"
        },
        {
            "name": "Tau Thích Mi",
            "singer": "Lil Pig",
            "image": "./assest/img/19.png",
            "audio": "./assest/audio/19.mp3"
        },
        {
            "name": "Về Bên Anh",
            "singer": "Jack",
            "image": "./assest/img/20.png",
            "audio": "./assest/audio/20.mp3"
        }
    ],
    currentSongIndex: 0,
    isRepeat: false,
    isRandom: false,
    cdThumbAnimate: cdThumb.animate([
        { transform: 'rotate(360deg)' },
    ], { 
        duration: 10000,
        iterations: Infinity
    }),
    start() {
        this.renderSong();
        this.settingDefaultConfig();
        this.handleDOMEvents();
    },
    renderSong() {
        var htmls = this.songs.map(function (song) {
            return `<div class="song">
                <div class="thumb" style="background-image: url(${song.image})"></div>
                <div class="body">
                    <h3 class="title">${song.name}</h3>
                    <p class="singer">${song.singer}</p>
                </div>
                <div class="option">
                    <i class="fas fa-ellipsis-h"></i>
                </div>
            </div>`;
        });

        // Hợp 1 mảng các chuỗi thành 1 chuỗi duy nhất và gán nó cho playlist.innerHTML
        playlist.innerHTML = htmls.join('');
    },
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
    setConfig (key, value) {
        // Thêm 1 cặp key - value vào đối tượng config
        this.config[key] = value;

        // Lưu cặp key - value đó vào localStorage thông qua PLAYER_STORAGE_KEY
        localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config));
    },
    settingDefaultConfig() {
        this.currentSongIndex = this.config.currentSongIndexLS || 0;
        this.isRepeat = this.config.isRepeatLS || false;
        this.isRandom = this.config.isRandomLS || false;
        audio.currentTime = this.config.audioCurrentTimeLS || 0;
        progressInput.value = this.config.progressInputValueLS || 0;

        // Dừng CD, hiển thị nút pause, xử lí cập nhật những thông tin của bài hát hiện tại
        this.cdThumbAnimate.pause();
        this.toggleActiveTogglePlayBtn('paused');
        this.handleUpdateCurrentSongInfos();
    },
    handleDOMEvents() {
        const _this = this;

        // Click vào nút phát/dừng
        togglePlayBtn.addEventListener('click', function (e) {
            // Nếu thẻ con của togglePlayBtn có chứa class 'icon-play' thì nút phát được click
            if (!! e.target.closest('.icon-play')) {
                _this.resumePlayAudio();
            }
            // Ngược lại, nút dừng được click
            else {
                _this.pauseAudio();
            }
        });

        // Click vào nút phát lại/phát ngẫu nhiên
        repeatBtn.addEventListener('click', function (e) {
            // Kiểm tra nút hiện tại có đang active không ?
            var isActive = !! (e.target.closest('.active'));

            // Chuyển đổi trạng thái active
            repeatBtn.classList.toggle('active', ! isActive);
            _this.isRepeat = ! isActive;

            // Gỡ class 'active' của nút random nếu có
            if (randomBtn.classList.contains('active')) {
                randomBtn.classList.remove('active');
            }
            _this.isRandom = false;

            // *Lưu trạng thái có nhấn nút phát lại không vào localStorage
            _this.setConfig("isRepeatLS", _this.isRepeat);
        });

        randomBtn.addEventListener('click', function (e) {
            // Kiểm tra nút hiện tại có đang active không ?
            var isActive = !! (e.target.closest('.active'));

            // Chuyển đổi trạng thái active
            randomBtn.classList.toggle('active', ! isActive);
            _this.isRandom = ! isActive;

            // Gỡ class 'active' của nút repeat nếu có
            if (repeatBtn.classList.contains('active')) {
                repeatBtn.classList.remove('active');
            }
            _this.isRepeat = false;

            // *Lưu trạng thái có nhấn nút phát ngẫu nhiên không vào localStorage
            _this.setConfig("isRandomLS", _this.isRandom);
        });

        // Kéo thả input tiến độ bài hát
        progressInput.addEventListener('input', function(e) {
            audio.currentTime = audio.duration / 100 * Number(e.target.value);
        });

        // Click nút trở lại/tiếp theo để chọn bài hát trước đó/tiếp theo
        previousBtn.addEventListener('click', function(e) {
            var newCurrentSongIndex;

            // Nếu như có nhấn nút random trước đó
            if (_this.isRandom) {
                do {
                    // Random 1 số ngẫu nhiên từ 0 -> songs.length
                    newCurrentSongIndex = Math.floor(Math.random() * _this.songs.length);
                } while (newCurrentSongIndex == _this.currentSongIndex);
            } else {
                newCurrentSongIndex = (_this.currentSongIndex == 0) ? 
                    (_this.songs.length-1) : (_this.currentSongIndex-1);
            }
            
            // Cập nhật vị trí của bài hát mới
            _this.currentSongIndex = newCurrentSongIndex;
            _this.playAudio();
        });

        nextBtn.addEventListener('click', function(e) {
            var newCurrentSongIndex;

            // Nếu như có nhấn nút random trước đó
            if (_this.isRandom) {
                do {
                    // Random 1 số ngẫu nhiên từ 0 -> songs.length
                    newCurrentSongIndex = Math.floor(Math.random() * _this.songs.length);
                } while (newCurrentSongIndex == _this.currentSongIndex);
            } else {
                newCurrentSongIndex = (_this.currentSongIndex == _this.songs.length-1) ? 
                    0 : (_this.currentSongIndex+1);
            }
            
            // Cập nhật vị trí của bài hát mới
            _this.currentSongIndex = newCurrentSongIndex;
            _this.playAudio();
        });

        // Tự động chuyển bài hát mới khi hết bài hát cũ
        audio.addEventListener('ended', function (e) {
            var newCurrentSongIndex;

            if (_this.isRepeat) {
                newCurrentSongIndex = _this.currentSongIndex;
            } else {
                if (_this.isRandom) {
                    do {
                        // Random một số ngẫu nhiên từ 0 -> songs.length để gán cho biến newCurrentSongIndex
                        newCurrentSongIndex = Math.floor(Math.random() * _this.songs.length);
                    } while (newCurrentSongIndex == _this.currentSongIndex);
                } else {
                    newCurrentSongIndex = (_this.currentSongIndex == _this.songs.length-1) ? 
                        0 : (_this.currentSongIndex+1);
                }
            }
    
            _this.currentSongIndex = newCurrentSongIndex;
            _this.playAudio();
        });

        // Khi bài hát phát thì cập nhật thanh tiến độ
        audio.addEventListener('timeupdate', function (e) {
            if (audio.duration) {
                progressInput.value = String(Math.floor(audio.currentTime / audio.duration * 100));

                // *Lưu thời gian và tiến độ 'hiện tại' của bài hát hiện tại vào localStorage
                _this.setConfig("audioCurrentTimeLS", audio.currentTime);
                _this.setConfig("progressInputValueLS", progressInput.value);
            }
        });

        // Khi click vào bài hát trong danh sách (playlist) 
        const songsArray = $$('.song');
        songsArray.forEach(function(song, index) {
            song.addEventListener('click', function (e) {
                // Nếu click vào bài hát (ngoại trừ phần option và bài hát hiện tại)
                if (! e.target.closest('.option') && _this.currentSongIndex != index) {
                    _this.currentSongIndex = index;
                    _this.playAudio();
                }
            })
        });
    },
    resumePlayAudio() {
        this.toggleActiveTogglePlayBtn('playing');
        this.cdThumbAnimate.play();

        // *Lưu vị trí của bài hát hiện tại vào localStorage
        this.setConfig("currentSongIndexLS", this.currentSongIndex);

        audio.play();
    },
    playAudio() {
        this.handleUpdateCurrentSongInfos();
        this.toggleActiveTogglePlayBtn('playing');
        this.cdThumbAnimate.play();
                        
        // *Lưu vị trí của bài hát hiện tại vào localStorage
        this.setConfig("currentSongIndexLS", this.currentSongIndex);

        audio.play();
    },
    pauseAudio() {
        this.toggleActiveTogglePlayBtn('paused');
        this.cdThumbAnimate.pause();
                        
        // *Lưu vị trí của bài hát hiện tại vào localStorage
        this.setConfig("currentSongIndexLS", this.currentSongIndex);

        audio.pause();
    },
    handleUpdateCurrentSongInfos() {
        this.updateCurrentSong();
        this.handleScrollIntoViewAndActiveCurrentSongInPlaylist();
    },
    updateCurrentSong() {
        currentSongName.innerHTML = this.songs[this.currentSongIndex].name;
        cdThumb.style.backgroundImage = `url(${this.songs[this.currentSongIndex].image})`;
        audio.src = `${this.songs[this.currentSongIndex].audio}`;
    },
    handleScrollIntoViewAndActiveCurrentSongInPlaylist() {
        // 1.Gỡ - thêm class 'active' cho bài hát
        var currentSongInPlaylist = $(`.song:nth-child(${this.currentSongIndex + 1})`);

        // Bài hát nào đang active thì xóa class 'active' đó
        if ($('.song.active')) {
            $('.song.active').classList.remove('active');
        }
        // Thêm class 'active' cho bài hát hiện tại trong danh sách
        currentSongInPlaylist.classList.add('active');


        // 2.Cuộn đến bài hát được active
        var aSongElementHeight = $('.song').clientHeight;

        // Lấy chiều cao của 'this.currentSongIndex' bài hát và cộng với khoảng cách giữa các bài hát tương ứng
        // Nếu this.currentSongIndex = 5 thì lấy 5 lần chiều cao của 1 bài hát và cộng với 25 
        // để ra được chiều cao cần thiết cho việc cuộn đến vị trí bài hát hiện tại
        var neededHeight = (this.currentSongIndex * aSongElementHeight) + (this.currentSongIndex * 5);
        window.scrollTo(0, neededHeight);
    },
    toggleActiveTogglePlayBtn(status) {
        // status value: 'paused' / 'playing'
        if (status == 'playing') {
            playBtn.classList.toggle('active', false);
            pauseBtn.classList.toggle('active', true);
        } else {
            playBtn.classList.toggle('active', true);
            pauseBtn.classList.toggle('active', false);
        }
    }
}


// Khởi chạy ứng dụng
app.start();