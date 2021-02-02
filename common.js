export const $ = (sel, ctx = document) => ctx.querySelector(sel);
export const $$ = (sel, ctx = document) => ctx.querySelectorAll(sel);

export const paymentPointerToURL = pp => {
  if (pp.startsWith("$")) {
    pp = pp.replace(/^\$/, "https://");
    if (!pp.includes("/")) pp += "/.well-known/pay";
  }
  return pp;
};

export const createLinkElement = href => {
  const link = document.createElement("link");
  link.rel = "monetization";
  link.href = paymentPointerToURL(href);
  return link;
};

export const setMonetizationTag = href => {
  const head = document.head;
  const el = $("link[rel=monetization]", head);
  if (href && el) {
    el.href = paymentPointerToURL(href);
  } else if (href) {
    head.append(createLinkElement(href));
  } else if (el) {
    el.remove();
  }
};

export const now = () => {
  return new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    fractionalSecondDigits: 3,
  });
};
