{
  pkgs,
  lib,
  inputs,
  ...
}:

let
  pkgs-playwright = import inputs.nixpkgs-playwright {
    system = pkgs.stdenv.system;
  };

  playwright = pkgs-playwright.playwright;

  browsers =
    (builtins.fromJSON (builtins.readFile "${pkgs-playwright.playwright-driver}/browsers.json"))
    .browsers;

  chromium = builtins.head (builtins.filter (browser: browser.name == "chromium") browsers);

  chromiumExecutable = "${playwright.browsers}/chromium-${chromium.revision}/chrome-linux/chrome";

in
{
  packages = with pkgs; [
    just
    nodejs
  ];

  languages.javascript.enable = true;

  env = {
    PLAYWRIGHT_BROWSERS_PATH = "${playwright.browsers}";
    PLAYWRIGHT_SKIP_VALIDATE_HOST_REQUIREMENTS = "true";
    PLAYWRIGHT_NODEJS_PATH = lib.getExe pkgs.nodejs;
    PLAYWRIGHT_LAUNCH_OPTIONS_EXECUTABLE_PATH = chromiumExecutable;
  };

  dotenv.disableHint = true;
  cachix.enable = false;

  scripts.intro.exec = ''
    nixPlaywrightVersion="${playwright.version}"

    npmPlaywrightVersion="$(
      pnpm exec playwright --version 2>/dev/null |
      sed 's/^Version //'
    )"

    echo "❄️ Playwright Nix version: $nixPlaywrightVersion"

    if [ -z "$npmPlaywrightVersion" ]; then
      echo "⚠️ Playwright npm package is not installed or unavailable."
    else
      echo "📦 Playwright npm version: $npmPlaywrightVersion"

      if [ "$nixPlaywrightVersion" != "$npmPlaywrightVersion" ]; then
        echo "❌ Playwright versions do not match."
      else
        echo "✅ Playwright versions match."
      fi
    fi

    echo
    env | grep '^PLAYWRIGHT' || true

    echo
    if [ -x "$PLAYWRIGHT_LAUNCH_OPTIONS_EXECUTABLE_PATH" ]; then
      echo "✅ Chromium executable exists."
    else
      echo "❌ Chromium executable missing."
    fi
  '';

  enterShell = ''
    intro
  '';
}
