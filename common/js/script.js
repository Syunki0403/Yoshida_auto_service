$(function () {
    var setImg = '.header_contents_images';
    var fadeSpeed = 1000;
    var switchDelay = 4000;
    var shopsClass;/*選択した「拠点紹介」モーダルのクラス名*/
    var mapNum;/*「店舗地図」のお店番号*/
    var sceneNum;/*「店内風景」の番号*/
    var shopsModalNum;/*「拠点紹介」のお店番号*/
    var slideListClass;/*写真リストのクラス*/
    var openPictureList;

    $(setImg).children('li').css({ opacity: '0' });
    $(setImg + ' li:first').stop().animate({ opacity: '1' }, fadeSpeed);

    setInterval(function () {
        $(setImg + ' li:first-child').animate({ opacity: '0' }, fadeSpeed).next('li').animate({ opacity: '1' }, fadeSpeed).end().appendTo(setImg);
    }, switchDelay);

    $(window).scroll(function () {
        //　画像のスライドオープン
        $('.main-content').each(function () {
            var posi = $(this).offset().top;
            var scroll = $(window).scrollTop();
            if (scroll >= posi) {
                $('.main-content_wrap', this).slideUp(1000);
            }
        });

        // メニューのフェード
        $('footer').each(function () {
            var posi = $(this).offset().top;
            var scroll = $(window).scrollTop();
            if ((scroll + 600) >= posi) {
                $('.menu_btn').fadeOut();
            } else {
                $('.menu_btn').fadeIn();
            }
        })
    });

    //  メニュー押下時の動作
    $('.menu_btn').on('click', function () {
        $('.menu_btn_line').toggleClass('active');
        $('.menu_btn').toggleClass('active');
        $('.menu_nav').fadeToggle('fast');
    });

    //  企業情報ページのモーダル
    $('.js-outline_modal-open').on('click', function () {
        $('.modal').css('display', 'block');
        return false;
    });
    $('.js-outline_modal-close').on('click', function () {
        $('.modal').css('display', 'none');
    });

    //  事業紹介ページの「拠点紹介」モーダル
    $('.js-shops_modal_open').on('click', function () {
        var href = $(this).attr("href");
        var hrefLength = href.length;
        shopsModalNum = href.slice(13, hrefLength);
        shopsClass = ".shops_modal-item-" + shopsModalNum;
        $(shopsClass).addClass('active');
        $(shopsClass).css('display', 'block');
        $('.shops_modal').css('display', 'block');
        return false;
    });
    $('.js-shops_modal_close').on('click', function () {
        $(shopsClass).removeClass('active');
        $(shopsClass).css('display', 'none');
        $('.shops_modal').css('display', 'none');
        return false;
    });

    //  事業紹介ページの「店舗地図」モーダル
    $('.js-map_modal_open').on('click', function () {
        var href = $(this).attr("href");
        var hrefLength = href.length;
        var num = href.slice(11, hrefLength);
        mapNum = ".map_modal_item-" + num;
        $(mapNum).css('display', 'block');
        $('.map_modal').css('display', 'block');
        return false;
    });
    $('.js-map_modal_close').on('click', function () {
        $(mapNum).css('display', 'none');
        $('.map_modal').css('display', 'none');
        return false;
    });

    //  事業紹介ページの「店内風景」モーダル
    $('.js-scene_modal_open').on('click', function () {
        var href = $(this).attr("href");
        var hrefLength = href.length;
        var num = href.slice(13, hrefLength);
        sceneNum = ".scene_modal_item-" + num;
        $(sceneNum).css('display', 'block');
        $('.scene_modal').css('display', 'block');
        return false;
    });
    $('.js-scene_modal_close').on('click', function () {
        $(sceneNum).css('display', 'none');
        $('.scene_modal').css('display', 'none');
        return false;
    });

    // 事業紹介ページの「店舗写真スライド」モーダル
    $('.js-picture-show').on('click', function () {
        openPictureList = ".js-slide_contents-" + shopsModalNum;/*写真スライドのリスト特定*/
        var shopsListClass = shopsClass + " .js-picture-show";/*index用のクラス*/
        var focusPicture = $(shopsListClass).index(this);/*何枚目の写真か特定*/

        $('.slide_contents').slick('unslick');
        $('.slide_contents').slick({
            initialSlide: focusPicture,
            infinite: false,
            nextArrow: '<img src="../common/img/arrow_next.png" class="slide-arrow next-arrow">',
            prevArrow: '<img src="../common/img/arrow_prev.png" class="slide-arrow prev-arrow" style="display: none;">',
        });
        $('.slide-arrow').removeAttr('style');

        $('.pictures_modal').css('display', 'block');
        $(openPictureList).css('display', 'block');
        return false;
    });
    $('.js-pictures_modal_close').on('click', function () {
        $('.pictures_modal').css('display', 'none');
        $(openPictureList).css('display', 'none');
        return false;
    });

    // 採用情報ページの社員コメントスライド
    $('.js-comments_title').on('click', function () {
        $(this).next().slideToggle('fast');
    });

    // 採用情報ページのスムーススクロール
    $('.recruit_nav_list a, .entry-btn').click(function () {
        var speed = 500;
        var href = $(this).attr("href");
        var target = $(href == "#" || href == "" ? 'html' : href);
        var position = target.offset().top;
        $("html, body").animate({ scrollTop: position }, speed, "swing");
        return false;
    });

    // 住所検索
    $('.js-post-research').on('click', function () {
        AjaxZip3.zip2addr('post', '', 'pref', 'addr1', 'addr2');

        return false;
    });

    // チェックボックス判定
    $("input[name='reply']").on('click', function () {
        var check = $(this).prop('checked');
        var id = $(this).attr('id');

        if (check) {
            switch (id) {
                case 'chkbox1':
                    $('.contact-phone span').css('display', 'inline');
                    break;
                case 'chkbox3':
                    $('.contact-mobile span').css('display', 'inline');
                    break;
                case 'chkbox4':
                    $('.contact-fax span').css('display', 'inline');
                    break;
            }
        } else {
            switch (id) {
                case 'chkbox1':
                    $('.contact-phone span').css('display', 'none');
                    break;
                case 'chkbox3':
                    $('.contact-mobile span').css('display', 'none');
                    break;
                case 'chkbox4':
                    $('.contact-fax span').css('display', 'none');
                    break;
            }
        }
    });

    // プライバシーポリシーのチェック
    // $(".privacy label").before().on('click', function () {
    //     $(this).css('background-color','#ea5514');
    // });

    // フッターのスムーススクロール
    $('.js-movetop').click(function () {
        var speed = 500;
        var href = $(this).attr("href");
        var target = $(href == "#" || href == "" ? 'html' : href);
        var position = target.offset().top;
        $("html, body").animate({ scrollTop: position }, speed, "swing");
        return false;
    });


});


