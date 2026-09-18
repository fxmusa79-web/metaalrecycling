import {
  site,
  phoneHref,
  emailHref,
  phoneLabel,
  emailLabel,
} from '../config/site.js'
import { icons } from './icons.js'

export function TopBar() {
  return `
    <div class="topbar">
      <div class="container topbar__inner">
        <p class="topbar__trust">${site.trustLine}</p>
        <div class="topbar__contacts">
          <a class="topbar__link" href="${phoneHref()}">
            ${icons.phone}
            <span>${phoneLabel()}</span>
          </a>
          <a class="topbar__link topbar__link--email" href="${emailHref()}">
            ${icons.mail}
            <span class="topbar__email-full">${emailLabel()}</span>
            <span class="topbar__email-short">E-mail</span>
          </a>
        </div>
      </div>
    </div>
  `
}
