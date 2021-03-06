<!--suppress HtmlDeprecatedAttribute -->
<p align="center">
    <img src="./dist/icons/icon_144.png" alt="Document Chat Logo" />
</p>

# Document Chat for Adobe XD

[![mentioned in xd-awesome](https://img.shields.io/badge/mentioned%20in-xd--awesome-%23FF2BC2.svg?colorA=2E001E)](https://github.com/AdobeXD/xd-awesome)
![Node CI](https://github.com/pklaschka/chat-xd-plugin/workflows/Node%20CI/badge.svg)
![End-to-end tests](https://github.com/pklaschka/chat-xd-plugin/workflows/End-to-end%20tests/badge.svg)
![Lint](https://github.com/pklaschka/chat-xd-plugin/workflows/Lint/badge.svg)

> Chat for XD Cloud Documents

Document Chat is the privacy-first chatting solution for collaborative work on
XD documents. Ideally used with XD's "Live Coediting" feature.

By saving all the data (like chat messages) in the document itself (instead of
external servers), we never send the messages to our own servers. Actually, if
you don't explicitly opt into features enhancing your experience (like showing
profile pictures from Gravatar), the plugin itself doesn't perform any network
requests whatsoever.

Even better: You don't have to save any personal data. While a name might be
nice for your coworkers (to recognize you), you can just as well use an invented
name. Also, providing an email address for your profile picture (from Gravatar)
is entirely optional. As the data never reaches our servers anyways, it doesn't
matter to us ;-)

Combined with a few unique features (like jumping to the viewport location of a
message), this and open-source plugin becomes a great choice for quick
communication inside XD.

## Credits

To add autocompletion, this boilerplate uses the MIT-licensed Typescript
definitions that can be found at https://github.com/AdobeXD/typings.
