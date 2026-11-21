/** Report delivery errors honestly; retry only the exact supplied original URL. */
export function mountImageLoading(root) {
  const cleanups = [];
  root.querySelectorAll('.hero-card__frame').forEach((frame) => {
    const image = frame.querySelector('img');
    const error = frame.querySelector('.hero-card__image-error');
    const retry = frame.querySelector('[data-retry-image]');
    const onError = () => {
      image.hidden = true;
      error.hidden = false;
      retry.disabled = false;
      retry.textContent = 'Retry image';
    };
    const onLoad = () => {
      image.hidden = false;
      error.hidden = true;
      retry.disabled = false;
      retry.textContent = 'Retry image';
    };
    const onRetry = () => {
      retry.disabled = true;
      retry.textContent = 'Loading…';
      image.src = image.getAttribute('src');
    };
    image.addEventListener('error', onError);
    image.addEventListener('load', onLoad);
    retry.addEventListener('click', onRetry);
    if (image.complete) {
      if (image.naturalWidth > 0) onLoad();
      else onError();
    }
    cleanups.push(() => {
      image.removeEventListener('error', onError);
      image.removeEventListener('load', onLoad);
      retry.removeEventListener('click', onRetry);
    });
  });
  return () => cleanups.forEach((cleanup) => cleanup());
}
