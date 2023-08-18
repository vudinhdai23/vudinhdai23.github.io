const get = document.querySelector.bind(document);
const heading = get(" header H2")
const cdThumb = get(".cd-thumb")
const audio = get("#audio")
const playBtn = get('.btn-toggle-play')
const player = get(".contain")
const progress = get('#progress')
const nextbtn = get(".btn-next")
const prevbtn = get(".btn-prev")
const randombtn = get(".btn-random")
const repeatbtn = get(".btn-repeat")
const playing = get(".playlist")
const app = {

  currentIndex: 0,
  isPlaying: false,
  isRandom: false,
  isRepeat: false,
  // config: {},
  songs: [
    {
      name: "Lạc trôi Remix",
      singer: "Sơn Tùng MTP",
      path: "./Music/LacTroiTripleDRemix-SonTungMTP-5164670.mp3",
      image: "https://avatar-ex-swe.nixcdn.com/playlist/2017/09/08/d/8/2/b/1504878126583_500.jpg"
    },
    {
      name: "Xóa tên anh đi",
      singer: "Jack J97",
      path: "./Music/XoaTenAnhDi-JackJ97-10698291.mp3",
      image: "https://avatar-ex-swe.nixcdn.com/playlist/2023/08/11/1/5/3/5/1691740938098_500.jpg"
    },
    {
      name: "Người Ta Lấy Chồng",
      singer: "Thành Đạt",
      path: "./Music/NgayMaiNguoiTaLayChong-ThanhDat-9466823 (1).mp3",
      image: " https://avatar-ex-swe.nixcdn.com/song/2023/05/12/2/4/f/0/1683905522466_500.jpg"
    },
    {
      name: "Hoa hải đường",
      singer: "Jack J97",
      path: "./Music/HoaHaiDuongMoxxRemix-JackG5R-6668099.mp3",
      image: "https://avatar-ex-swe.nixcdn.com/song/2023/01/13/e/7/9/d/1673582146227_500.jpg  "
    },
    {
      name: "Em là ai",
      singer: "Jack J97",
      path: "./Music/EmLaAi-NP2-8738647.mp3",
      image: "https://avatar-ex-swe.nixcdn.com/song/2023/02/20/4/0/d/0/1676860782174_500.jpg"
    },
    {
      name: "Là một thằng con trai",
      singer: "Jack J97",
      path: "./Music/La1ThangConTraiDJTrangChubbyRemix-JackG5R-6269233.mp3",
      image: "https://avatar-ex-swe.nixcdn.com/song/2023/02/08/f/b/7/8/1675840277547_500.jpg"
    },
    {
      name: "Nơi này có anh",
      singer: "Sơn Tùng MTP",
      path: "./Music/NoiNayCoAnh-SonTungMTP-4772041.mp3",
      image: "https://avatar-ex-swe.nixcdn.com/song/2017/05/19/0/4/d/e/1495165764676_500.jpg"
    },
    
    {
      name: "À lôi",
      singer: "Double2T",
      path: "./Music/ALoi-Double2TMasew-10119691.mp3",
      image: "https://avatar-ex-swe.nixcdn.com/song/2023/07/13/a/e/f/0/1689234585612_500.jpg"
    },
    {
      name: "Bình yên những phút giây",
      singer: "Sơn Tùng MTP",
      path: "./Music/BinhYenNhungPhutGiay-SonTungMTP-4915711.mp3",
      image: "https://avatar-ex-swe.nixcdn.com/playlist/2017/04/24/9/2/a/0/1493020332929_500.jpg"
    },
    {
      name: "Sao cũng được",
      singer: "Thành Đạt",
      path: "./Music/SaoCungDuoc-ThanhDat-8072594.mp3",
      image: "https://avatar-ex-swe.nixcdn.com/song/2022/10/16/5/e/5/8/1665933114579_500.jpg"
    },
    {
      name: "Muốn được cùng em",
      singer: "Freaky",
      path: "./Music/MuonDuocCungEm-Freaky-6792500.mp3",
      image: "https://avatar-ex-swe.nixcdn.com/song/2020/11/03/d/a/8/9/1604395141673_500.jpg"
    },
  
  ],
  render: function () {
    const html = this.songs.map((song,index) => {
      return ` 
    <div class="song ${index === this.currentIndex? 'active':''}" data ="${index}">
        <div class="img" >
            <div class="img-thumb" style="background-image: url(${song.image});">
            </div>
        </div>
        <div class="img-title" >
            <h5 style=" font-size:15px;margin-top:10px">${song.name}</h5>
            <span style ="font-size:10px">${song.singer}</span>
        </div>
        <div class="img-icon" >
            <div class="option">
                <i class="fas fa-ellipsis-h"></i>
            </div>
        </div>
    </div>
        `
    });

    playing.innerHTML = html.join("");
  },
  defineProperties: function () {
    Object.defineProperty(this, 'currentSong', {
      get: function () {
        return this.songs[this.currentIndex]
      }
    })
  },

  handleEvents: function () {
    const _this = this
    const cd = get(".cd")
    const cdWith = cd.offsetWidth

    // xử lý khi quay
    const cdThumbanimate = cdThumb.animate([
      { transform: 'rotate(360deg)' }
    ], {
      duration: 10000, //10 giây
      iterations: Infinity
    })
    cdThumbanimate.pause()
    //phongs to thu nho
    document.onscroll = function () {
      const scollTop = document.documentElement.scrollTop
      const newWith = cdWith - scollTop
      cd.style.width =newWith>0 ? newWith + "px":0
    }
    playBtn.onclick = function () {
      if (_this.isPlaying) {
        audio.pause()
      }
      else {
        audio.play()
      }
    }
    //khi play
    audio.onplay = function () {
      _this.isPlaying = true
      player.classList.add('playing')
      cdThumbanimate.play()
    }
    //khi pause
    audio.onpause = function () {
      _this.isPlaying = false
      player.classList.remove('playing')
      cdThumbanimate.pause()
    }
    //khi thay đôi tiến độ
    audio.ontimeupdate = function () {
      if (audio.duration) {
        const progressPersent = Math.floor(audio.currentTime / audio.duration * 100)
        progress.value = progressPersent

      }

    }
    //xử lý khi tua
    progress.onchange = function (e) {
      const seekTime = audio.duration / 100 * e.target.value
      audio.currentTime = seekTime

    }
    //khi next 
    nextbtn.onclick = function () {

      if (_this.isRandom) {
        _this.playRandom()
      } else {
        _this.nextSong()
      }

      audio.play()
      _this.render()
    }
    //khi prev
    prevbtn.onclick = function () {
      if (_this.isRandom) {
        _this.playRandom()
      } else {
        _this.prevSong()
      }
      audio.play()
      _this.render()
    }
    //khi random
    randombtn.onclick = function () {
      _this.isRandom = !_this.isRandom
      randombtn.classList.toggle("active", _this.isRandom)
    }
    //khi het bai hat tu dong next
    audio.onended = function () {
      if (_this.isRepeat) {
        audio.play()
      } else {
        nextbtn.click()
      }

    }
    // repeat song
    repeatbtn.onclick = function () {
      _this.isRepeat = !_this.isRepeat
      repeatbtn.classList.toggle("active", _this.isRepeat)
    }
    //select song
    playing.onclick = function(e){
      var songnode = e.target.closest('.song:not(.active)')
      if( songnode || e.target.closest('.option')){
        if(songnode){
         _this.currentIndex = Number(songnode.getAttribute('data'))
         _this.loadSong()
         _this.render()
         audio.play()
        }

      }
    }
  },
  loadSong: function () {

    heading.textContent = this.currentSong.name
    cdThumb.style.backgroundImage = `url(${this.currentSong.image})`
    audio.src = this.currentSong.path
  },
  nextSong: function () {
    this.currentIndex++;
    if (this.currentIndex >= this.songs.length) {
      this.currentIndex = 0
    }
    this.loadSong()
  },
  prevSong: function () {
    this.currentIndex--
    if (this.currentIndex < 0) {
      this.currentIndex = this.songs.length - 1
    }
    this.loadSong()
  },
  playRandom: function () {
    let newIndex
    do {
      newIndex = Math.floor(Math.random() * this.songs.length)
    } while (newIndex === this.currentIndex)
    this.currentIndex = newIndex
    this.loadSong()
  },
  start: function () {
    //next 

    //lấy ra bài hát đầu tiên
    this.defineProperties()
    //load sự kiện
    this.loadSong()
    //lắng nghe sự kiên
    this.handleEvents()
    // load bài hát
    this.render()
  }
}
app.start()
