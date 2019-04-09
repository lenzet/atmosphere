$(function() {
  $('a[href^="#"]').mPageScroll2id({
    scrollEasing: 'swing'
  });
  $('.recom-slider').owlCarousel({
    items: 2,
    loop: true,
    smartSpeed: 700,
    margin: 20,
    nav: true,
    navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
  });

  $('.select').append('<div class="arrow"><i class="fa fa-angle-down"></i></div>');
  $('select').click(function(){
    $('.select').not($(this).parent()).removeClass('clicked');
    if (!$(this).parent().hasClass('clicked')) {
      $(this).parent().addClass('clicked');
    } else {
      $(this).parent().removeClass('clicked');
    }
    $('body').click(function(){
      $('.select').removeClass('clicked');
    });
    $(this).parent().click(function(e){
      e.stopPropagation();
    });
  });

  $('.shares-slider').owlCarousel({
    items: 3,
    loop: true,
    smartSpeed: 700,
    margin: 56,
    nav: true,
    center: true,
    navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
    dots: true
  });
  $('.useful-slider').owlCarousel({
    items: 5,
    loop: true,
    smartSpeed: 700,
    margin: 20,
    nav: true,
    navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
    dots: true
  });
  $('.gallery-slider').owlCarousel({
    items: 3,
    loop: true,
    smartSpeed: 700,
    nav: true,
    center: true,
    navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>']
  });
  $('.s-gallery .link').click(function(e){
    e.preventDefault();
    $('.s-gallery .link').removeClass('active');
    $(this).addClass('active');
    var id = $(this).attr('id');
    $('.s-gallery .slider-wrapper').fadeOut(0);
    $('.s-gallery .slider-wrapper.' + id).fadeIn(0);
  });
  $('.s-free .link').click(function(e){
    e.preventDefault();
    $('.s-free .link').removeClass('active');
    $(this).addClass('active');
  });
  $('form.mail').submit(function() { 
    var th = $(this);
    if ($(this).hasClass('pdf')) window.open('rukovodstvo.pdf');
    $.ajax({
      type: "POST",
      url: "mail.php", 
      data: th.serialize(),
      success: function(msg) {
        console.log(msg);
      }
    }).done(function() {
      th.trigger("reset");
    });
    return false;
  });

  $('.leave').click(function(e){
    e.preventDefault();
    $('.popup-wrapper').fadeIn().css('display', 'flex');s
  });
  $('.popup-wrapper').click(function(e){
    $(this).fadeOut();
  });
  $('.popup-wrapper .form').click(function(e){
    e.stopPropagation();
  });
  $('.popup-wrapper .close').click(function(e){
    e.preventDefault();
    $('.popup-wrapper').fadeOut();
  });

  $('.sel-div[data-show]').click(function(e){
    $('.type-h3').css('display', 'block');
    var id = $(this).attr('data-show');
    $('.type-select').css('display', 'none');
    $('.type-select .type').removeClass('active');
    $('#' + id).css('display', 'block');
    calc();
  });

  $('.sel-div').click(function(e){
    if ($(this).hasClass('discount')) {
      $('.s-calc .discount').removeClass('active');
    } else if($(this).hasClass('type')) {
      $('.s-calc .type').removeClass('active');
    } else if($(this).hasClass('mat')) {
      $('.s-calc .mat').removeClass('active');
    }
    $(this).addClass('active');
    calc();
  });
  
  $('.s-calc .form select').change(calc);
  $('.s-calc .form input').on('input', calc);

  var now = new Date();
  $('#date1').text(now.format('dd.mm.yy'));
  for (i = 2; i < 6; i++) {
    now.setDate(now.getDate() + 1);
    $('#date' + i).text(now.format('dd.mm.yy'));
  }

  function calc() {
    var tip = $('.sel-div.type.active').attr('data');
    var mat = $('.sel-div.mat.active').attr('data');
    var skidka = $('.sel-div.discount.active').attr('data');
    var ugli = $('#ugli').val();
    var svet = $('#svet').val();
    var sq = $('#sq').val();
    var trub = $('#trub').val();
    var per = $('#per').val();
    
    var kUgli = 105;
    var kSvet = 420;
    var kTrub = 420;
    var kPer = 255;

    var kMat, sum;

    if (tip == 'PONGS' && mat == 'Лаковое') {
      kMat = 1000;
    } else if (tip == 'PONGS' && mat == 'Матовое') {
      kMat = 750;
    } else if (tip == 'PONGS' && mat == 'Сатиновое') {
      kMat = 750;
    } else if (tip == 'Elegance' && mat == 'Лаковое') {
      kMat = 570;
    } else if (tip == 'Elegance' && mat == 'Матовое') {
      kMat = 470;
    } else if (tip == 'Elegance' && mat == 'Сатиновое') {
      kMat = 470;
    } else if (tip == 'Ecoline' && mat == 'Лаковое') {
      kMat = 370;
    } else if (tip == 'Ecoline' && mat == 'Матовое') {
      kMat = 220;
    } else if (tip == 'Ecoline' && mat == 'Сатиновое') {
      kMat = 220;
    }

    sum = kMat * sq + kUgli * ugli + kSvet * svet + kTrub * trub + kPer * per;
    if (skidka) sum = sum * (100 - skidka) / 100;
    if (!sum || sum > 9999999) sum = 0;
    sum = sum.toFixed(0);
    $('#sum').text(sum);
  }
});
