define([], function () {
  return {
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
});