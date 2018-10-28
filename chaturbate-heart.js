import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-icons/iron-icons.js';

class ChaturbateHeart extends PolymerElement {
  static get template() {
    return html`    
      <style>
        :host {
          --cb-moderator-color: #DC0000;
          --cb-fanclub-color: #090;
          --cb-tipped-tons-color: #804baa;
          --cb-tipped-alot-color: #be6aff;
          --cb-tipped-color: #009;
          --cb-has-tokens-color: #69A;
        }

        .heart {
          opacity: 1;
          position: absolute;
          bottom: 0;
          display: none;
          animation-iteration-count: 1;
        }

        .heart iron-icon {
          position: absolute;
          right: 0;
          top: 0;
          opacity: .9;
        }

        .heart iron-icon.enormous {
          --iron-icon-height: 256px;
          --iron-icon-width: 256px;
        }
        .heart iron-icon.large {
          --iron-icon-height: 160px;
          --iron-icon-width: 160px;
        }
        .heart iron-icon.medium {
          --iron-icon-height: 96px;
          --iron-icon-width: 96px;
        }
        .heart iron-icon.small {
          --iron-icon-height: 64px;
          --iron-icon-width: 64px;
        }
        .heart iron-icon.tiny {
          --iron-icon-height: 32px;
          --iron-icon-width: 32px;
        }
        
        .user-moderator {
          color: var(--cb-moderator-color);
        }
        .user-fanclub {
          color: var(--cb-fanclub-color);
        }
        .user-tipped-tons {
          color: var(--cb-tipped-tons-color);
        }
        .user-tipped-alot {
          color: var(--cb-tipped-alot-color);
        }
        .user-tipped {
          color: var(--cb-tipped-color);
        }
        .user-has-tokens {
          color: var(--cb-has-tokens-color);
        }
        
        @keyframes flowOne {
          0% {
            opacity: 0;
            bottom: 0;
            right: 14%
          }
          40% {
            opacity: .8;
          }
          50% {
            opacity: 1;
            right: 0;
          }
          60% {
            opacity: .2;
          }
          80% {
            bottom: 80%
          }
          100% {
            opacity: 0;
            bottom: 100%;
            right: 18%
          }
        }
        
        @keyframes flowTwo {
          0% {
            opacity: 0;
            bottom: 0;
            right: 0;
          }
          40% {
            opacity: .8;
          }
          50% {
            opacity: 1;
            right: 11%
          }
          60% {
            opacity: .2;
          }
          80% {
            bottom: 60%
          }
          100% {
            opacity: 0;
            bottom: 80%;
            right: 0;
          }
        }
        
        @keyframes flowThree {
          0% {
            opacity: 0;
            bottom: 0;
            right: 0;
          }
          40% {
            opacity: .8;
          }
          50% {
            opacity: 1;
            right: 30%
          }
          60% {
            opacity: .2;
          }
          80% {
            bottom: 70%
          }
          100% {
            opacity: 0;
            bottom: 90%;
            right: 0;
          }
        }
      </style>

      <div id="heart"
            class$="heart [[colorClass]]"
            style$="animation: [[animation]] [[animationTime]]s linear;
                    display: block;">
        <iron-icon icon="icons:favorite" class$="[[sizeClass]]"></iron-icon>
      </div>`;
  }

  static get properties() {
    return {
      done: {
        type: Boolean,
        notify: true,
        value: false,
        reflectToAttribute: true,
        readOnly: true,
      },
      colorClass: {
        type: String,
        value: 'user-has-tokens'
      },
      animation: {
        type: String,
        value: 'flowOne'
      },
      animationTime: {
        type: Number,
        value: 1.6
      },
      sizeClass: {
        type: String,
        value: 'small'
      }
    }
  }

  _onDone() {
    this._setDone(true);
    this.dispatchEvent(new CustomEvent('done'));
  }

  connectedCallback() {
    super.connectedCallback();

    this.$.heart.addEventListener('webkitAnimationEnd', () => {
      this._onDone(true);
    });

    this.$.heart.addEventListener('animationend', () => {
      this._onDone(true)
    });
  }

}

window.customElements.define('chaturbate-heart', ChaturbateHeart);
