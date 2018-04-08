// @flow

declare module 'body-parser' {
    import type {$Request, $Response, Middleware} from 'express';

    declare interface Options {
        inflate?: boolean;
        limit?: number | string;
        type?: string | string[] | ((req: Request) => any);
        verify?: (req: $Request, res: $Response, buf: Buffer, encoding: string) => void;
    }

    declare interface OptionsJson extends Options {
        reviver?: (key: string, value: any) => any;
        strict?: boolean;
    }

    declare interface OptionsText extends Options {
        defaultCharset?: string;
    }

    declare interface OptionsUrlencoded extends Options {
        extended?: boolean;
        parameterLimit?: number;
    }

    declare type BodyParser = {
        json: (options?: OptionsJson) => Middleware,
        raw: (options?: Options) => Middleware,
        text: (options?: OptionsText) => Middleware,
        urlencoded: (options?: OptionsUrlencoded) => Middleware
    };

    declare export default BodyParser;
}