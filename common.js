// 네비바 마우스 오버 이벤트
$('#gnb').on('mouseenter', function () {
    $('#header').stop().animate({ height: 400 }, 500);
});

$('#gnb').on('mouseleave', function () {
    $('#header').stop().animate({ height: 100 }, 500);
});

// 슬라이드
let slideLength = $("#slideList li").length;
let num = 0;
let zNum = 0;
$("#btnBar").animate({ width: `100%` }, 3000)

let $video = $('#slideList video');
function videoControl() {
    $video[num].pause();
    setTimeout(function () {
        $video[num].currentTime = 0;
        $video[num].play();
    })
}

function nextSlide() {
    num++;
    zNum++;
    if (num === slideLength) num = 0;
    $("#slider li:eq(" + num + ")").css({ zIndex: zNum, opacity: 0 })
        .animate({ opacity: 1 }, 500, function () {
            zNum = 1;
            $("#slider li").not($(this)).css({ zIndex: 0 });
            $(this).css({ zIndex: 1 });
        })
    $('#pageNum').text(`0${num + 1}`);
    $("#btnBar").stop().css({ width: 0 }).animate({ width: `100%` }, 3000)
    // 비디오 재실행
    videoControl();
}

function prevSlide() {
    // 문영 작성



    videoControl();
};
let timer = setInterval(nextSlide, 4000)


$('.nextBtn').on('click', function () {
    nextSlide();
});

$('.prevBtn').on('click', function () {
    prevSlide();
});

// 스크롤시 텍스트 업
$(window).on('scroll', function (e) {

    if (window.scrollY > $("#franchise").offset().top - 800) {
        $('#faq').css({ bottom: '-800px' })
        $("#faq dl > *").each(function () {
            let $this = $(this);
            let pos = $(this).offset().top - 600
            if (window.scrollY > pos) {
                $this.css({ opacity: 1 })
            }
            else if (window.scrollY <= pos) {
                $this.css({ opacity: 0 })

            }
        })
    }
    else {
        $('#faq').css({ bottom: '-1200px' }), function () {
            state = 0;
        }
    }
    topChange();
    
});

let hasScrolled = false;
function topChange() {
    let windowHeight = window.innerHeight; // 브라우저 높이
    let bodyHeight = document.body.scrollHeight; // 콘텐츠 전체 높이
    let bottomHeight = $("#location").height()+$("#footer").height()-230

    if ((window.scrollY + windowHeight) >= bodyHeight-bottomHeight && !hasScrolled) {
        $("#pageTop").addClass("bottom");
        hasScrolled = false;
    }
    else if (window.scrollY < bodyHeight-bottomHeight) {  
        hasScrolled = false;
        $("#pageTop").removeClass("bottom")
    }  
}




//  눈알 마우스 따라다니기
function eyeMove(e) {
    let centerX = $('#characterLogo div').offset().left + $('#characterLogo div').width() / 2; // 중심 x좌표
    let centerY = $('#characterLogo div').offset().top + $('#characterLogo div').height() / 2; // 중심 y좌표
    let mouseX = e.pageX; // 마우스 x좌표
    let mouseY = e.pageY; // 마우스 y좌표
    let angle = Math.atan2(mouseY - centerY, mouseX - centerX); // 마우스와 중심 사이의 각도
    let pos = `rotate(${(180 * angle / Math.PI - 90)}deg)`;
    $('#characterLogo div').css({ transform: pos }) // 마우스와 중심 사이의 거리만큼 이동
}
$(window).on('mousemove', function (e) {
    eyeMove(e)
})
