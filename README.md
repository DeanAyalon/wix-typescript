# Purpose
This will be a template repository for using TypeScript with Wix Velo.

This branch was created to share the repository, modified so cloners do not have to download the @wix/cli, nor to create a Wix website just to be able to generate the [dynamic types directory](.wix)

# Error
TypeScript compiles ./app correctly, but then crashes scanning its own output:<br>
`tsc --build app`
```console
build/pages/Home.c1dmp.d.ts:1:24 - error TS2503: Cannot find namespace '$w'.
1 declare const _w: <T = $w.Element>(selector: Selectors) => T;
```

## Reproduction
```sh
npm i
tsc --build app
```

# File Structure
```md
- .wix/                   (Annoying auto-generated dir with page-specific types and some extended jsconfig files)
- tsconfig.json           (For IDE IntelliSense)
- app/                    (source)
  - tsconfig.json         (For build)
  - pages/
    - Home.c1dmp.ts
    - masterPage.ts
- ts/ 
  - conf/
    - tsconfig.page.json  (Base config for pages to extend)
    - pages/
      - tsconfig.c1dmp.json  (Extends tsconfig.page, with page specific types)
      - tsconfig.masterPage.json  (^)

- build/                  (The current output directory, will be replaced with src)
  - pages/...
```

