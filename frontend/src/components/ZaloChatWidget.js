import React from 'react';
import { Helmet } from 'react-helmet';

const ZaloChatWidget = () => {
  const zaloChatHtml = `
    <div class="zalo-chat-widget" data-oaid="524847969944307860" data-
    welcome-message="Rất vui khi được hỗ trợ bạn!" data-autopopup="0"
    data-width="" data-height=""></div>
    <script src="https://sp.zalo.me/plugins/sdk.js"></script>
  `;
  return (
    <Helmet>
      <script type="text/javascript">
        {zaloChatHtml}
      </script>
    </Helmet>
  );
};
export default ZaloChatWidget;
