import { PassThrough } from 'node:stream';
import { createReadableStreamFromReadable, type EntryContext } from '@remix-run/node';
import { RemixServer } from '@remix-run/react';
import { isbot } from 'isbot';
import { renderToPipeableStream } from 'react-dom/server';

const ABORT_DELAY = 5000;

const handleRequestWithStream = (
  readyEvent: 'onAllReady' | 'onShellReady',
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
) => {
  return new Promise((resolve, reject) => {
    let shellRendered = false;

    const { pipe, abort } = renderToPipeableStream(
      <RemixServer context={remixContext} url={request.url} abortDelay={ABORT_DELAY} />,
      {
        [readyEvent]: () => {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set('Content-Type', 'text/html');

          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode,
            }),
          );

          pipe(body);
        },

        onShellError: (error: unknown) => {
          reject(error as Error);
        },

        onError: (error: unknown) => {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        },
      },
    );

    setTimeout(abort, ABORT_DELAY);
  });
};

const handleRequest = (
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
) => {
  return isbot(request.headers.get('user-agent') ?? '')
    ? handleRequestWithStream(
        'onAllReady',
        request,
        responseStatusCode,
        responseHeaders,
        remixContext,
      )
    : handleRequestWithStream(
        'onShellReady',
        request,
        responseStatusCode,
        responseHeaders,
        remixContext,
      );
};

export default handleRequest;
