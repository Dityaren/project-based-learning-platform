import { Link } from "@tanstack/react-router";

import { Button } from "./ui/button";

export function DefaultNotFound() {
  return (
    <div className="space-y-2 p-2">
      <p>Halaman yang Anda cari tidak ditemukan.</p>
      <p className="flex flex-wrap items-center gap-2">
        <Button type="button" onClick={() => window.history.back()}>
          Kembali
        </Button>
        <Button render={<Link to="/" />} variant="secondary" nativeButton={false}>
          Beranda
        </Button>
      </p>
    </div>
  );
}
