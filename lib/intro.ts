/**
 * Releases every lock the intro overlay installs on the page.
 *
 * The intro marks landmarks as `inert` while it is on screen. If the intro is
 * unmounted without going through its normal exit path (for example by the
 * route-level safety timer), those attributes would stay behind and every menu
 * link would remain unclickable.
 */
export function releaseIntroUi() {
  if (typeof document === "undefined") return;
  document.documentElement.classList.remove("intro-pending");
  document.body.style.overflow = "";
  document.querySelectorAll("[inert]").forEach((el) => el.removeAttribute("inert"));
}
