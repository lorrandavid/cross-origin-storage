<div align="center">
  <h2>Cross-Origin Storage</h2>
  <blockquote>A same-origin storage for cross-domain access using Session Storage.</blockquote>
  <a href="https://github.com/lorrandavid/cross-origin-storage"><img alt="GitHub package.json version" src="https://img.shields.io/github/package-json/v/lorrandavid/cross-origin-storage"></a>
  <a href="https://www.npmjs.com/package/cross-origin-storage"><img alt="Package Version" src="https://img.shields.io/npm/v/cross-origin-storage?color=red"></a>
  <img alt="NPM" src="https://img.shields.io/npm/l/cross-origin-storage">
</div>

# Table of Contents

- Instalation
- Usage
- API


# Instalation

Simply install the package in two applications, one that is going  to be considered the Host, containing all the data you want to transfer, and a second one known as the Guest which will receive the data.
```
npm install cross-origin-storage
```

# Usage

## Host

Use `CrossOriginStorageHost` from `cross-origin-storage` whenever you want to **transfer** data from Host to Guest:
```
import { CrossOriginStorageHost } from "cross-origin-storage";

const host = new CrossOriginStorageHost({
	excludes: [],
	whitelist: ["${GUEST_APPLICATION_URL}"],
	identifier: "${SAME_IDENTIFIER_HOST_GUEST}",
	iframeUrl: "${GUEST_APPLICATION_URL}",
	initCallback: () => {},
});
```

## Guest

Use `CrossOriginStorageGuest` from `cross-origin-storage` whenever you want to **retrieve** data from Host:
```
import { CrossOriginStorageGuest } from "cross-origin-storage";

const guest = new CrossOriginStorageGuest({
	whitelist: ["${HOST_APPLICATION_URL}"],
	identifier: "${SAME_IDENTIFIER_HOST_GUEST}",
});
```

# API

## CrossOriginStorageHost

## CrossOriginStorageGuest