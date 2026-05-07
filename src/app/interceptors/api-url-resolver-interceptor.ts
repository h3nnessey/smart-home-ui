import type { HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { environment } from '@environment';

const resolveApiUrl = (request: HttpRequest<unknown>) => {
  const { apiPrefix, baseUrl } = environment;

  if (request.url.startsWith('http')) {
    return request;
  }

  const hasApiPrefix = request.url.includes(apiPrefix);
  const cleanUrl = request.url.startsWith('/')
    ? request.url.slice(1)
    : request.url;

  return request.clone({
    url: hasApiPrefix
      ? `${baseUrl}/${cleanUrl}`
      : `${baseUrl}/${apiPrefix}/${cleanUrl}`,
  });
};

export const apiUrlResolverInterceptor: HttpInterceptorFn = (req, next) => {
  const withResolvedUrlRequest = resolveApiUrl(req);

  return next(withResolvedUrlRequest);
};
