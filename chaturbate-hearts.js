import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './chaturbate-heart.js'

class ChaturbateHearts extends PolymerElement {
  static get template() {
    return html `
    <style>
      chaturbate-heart {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
      }
    </style>`;
  }

  static get properties() {
    return {
      minTimeout: {
        type: Number,
        value: 1.2
      },
      maxTimeout: {
        type: Number,
        value: 1.6
      }
    }
  }

  static get flows() {
    return [
      'flowOne',
      'flowTwo',
      'flowThree'
    ];
  }

  _getColorClass(item) {
    if (item.user.isMod) return 'user-moderator';
    if (item.user.inFanclub) return 'user-fanclub';
    if (item.user.tippedTonsRecently) return 'user-tipped-tons';
    if (item.user.tippedAlotRecently) return 'user-tipped-alot';
    if (item.user.tippedRecently) return 'user-tipped';
    if (item.user.hasTokens) return 'user-has-tokens';
  }

  _getIconSizeClass(item) {
    if (item.amount >= 1000) return 'enormous';
    if (item.amount >= 500) return 'large';
    if (item.amount >= 100) return 'medium';
    if (item.amount >= 15) return 'small';
    return 'tiny';
  }

  _getAnimation(item) {
    const len = ChaturbateHearts.flows.length;
    const index = Math.floor((Math.random() * len));
    return ChaturbateHearts.flows[index];
  }

  _getAnimationTime(item) {
    return this._getAnimationTimeValue(item) * this._getAnimationTimeSeed();
  }

  _getAnimationTimeValue(item) {
    if (item.amount >= 1000) return 16;
    if (item.amount >= 500) return 8;
    if (item.amount >= 100) return 4;
    if (item.amount >= 15) return 2;
    return 1;
  }

  _getAnimationTimeSeed() {
    return (
      Math.random() *
      (this.maxTimeout - this.minTimeout) + this.minTimeout
    ).toFixed(1);
  }

  show(params) {
    const heart = document.createElement('chaturbate-heart');
    heart.setAttribute('animation', this._getAnimation(params));
    heart.setAttribute('color-class', this._getColorClass(params));
    heart.setAttribute('animation-time', this._getAnimationTime(params));
    heart.setAttribute('size-class', this._getIconSizeClass(params));

    heart.addEventListener('done', (e) => {
      this.shadowRoot.removeChild(heart);
    });

    this.shadowRoot.appendChild(heart);
  }
}


window.customElements.define('chaturbate-hearts', ChaturbateHearts);
