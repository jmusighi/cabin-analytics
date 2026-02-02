export function generateTrackingScript(trackingId: string) {
  return `<script>
(function() {
  var cabin = window.cabin || (window.cabin = {});
  cabin.t = '${trackingId}';
  
  function track() {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://cabin.so/api/track', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
      t: cabin.t,
      u: window.location.href,
      r: document.referrer,
      w: window.innerWidth,
      h: window.innerHeight,
      d: new Date().toISOString()
    }));
  }
  
  if (document.readyState === 'complete') {
    track();
  } else {
    window.addEventListener('load', track);
  }
})();
</script>`;
}
