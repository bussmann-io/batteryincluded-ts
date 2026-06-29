{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
    buildInputs = [
        pkgs.nodejs_24
        pkgs.bun
        pkgs.git
    ];
}
