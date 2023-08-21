document.addEventListener('DOMContentLoaded', function() {
  dvh();
  window.addEventListener('resize', dvh);

  /* Device Viewport Size Responsive */
  function dvh() {
    let vh = window.innerHeight * 0.01;
    document.querySelector(':root').style.setProperty('--dvh', vh + 'px');
  }
});
