define([], function () {
  var overlay = {
    show: function (html) {
      $('.overlay-content').html(html);
      $('.overlay').removeClass('hide');
      $('.main-wrap').addClass('blur');
    },
    hide: function () {
      $('.overlay').addClass('hide');
      $('.main-wrap').removeClass('blur');
    },
    visible: function () {
      return !$('.overlay').hasClass('hide');
    }
  };
  $(function () {
    $('.overlay-content').on('click', function (e) {
      e.stopPropagation();
    });
    $('.overlay').on('click', overlay.hide);
  });
  return overlay;
});