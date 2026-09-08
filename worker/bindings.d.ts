// The D1 binding is optional: GitHub Pages does not provision a database.
// This matches getDb()'s existing runtime guard and the optional hosting config.
declare namespace Cloudflare {
  interface Env {
    DB?: D1Database;
  }
}
