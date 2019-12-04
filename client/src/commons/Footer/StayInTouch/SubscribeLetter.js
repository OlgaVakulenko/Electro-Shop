export const SubscribeLetter = (props) => {
  const redirectUrl = window.location.origin;
  const unsubscribeUrl = `${window.location.origin}/subscribers/email/${props.email}`;
  const mailBody = `<!DOCTYPE html> <html lang='en'><head> <meta charset='UTF-8' /> <meta name='viewport' content='width=device-width, initial-scale=1.0' /> <meta http-equiv='X-UA-Compatible' content='ie=edge' />
        <title>Document</title>
        
        <style> td { width: 100vw; margin: 0 auto; padding: 20px auto; background:#E5E5E5; border-radius: 6px; color: #444444; font-size: 20px; text-align: center; } </style> </head> <body>
        <table>
             <tr>
                <td>
                    <img src='https://optinmonster.com/wp-content/uploads/2017/09/perfect-welcome-email-for-new-subscribers-1.jpg' alt="welcome" border="0" width="80%" style="display:block; margin: 20px auto;"/>
                    <a href=${redirectUrl} style="margin-top:20px; color: #333333; font: 10px Arial, sans-serif; line-height: 30px; -webkit-text-size-adjust:none; display: block;" target="_blank"><svg width="101" height="14" viewBox="0 0 101 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.8091 0C12.1025 0 12.353 0.1 12.5606 0.3C12.7753 0.493333 12.8827 0.726667 12.8827 1C12.8827 1.27333 12.7753 1.51 12.5606 1.71C12.353 1.90333 12.1025 2 11.8091 2H2.14711V6H9.66199C9.95543 6 10.2059 6.1 10.4135 6.3C10.6282 6.49333 10.7355 6.72667 10.7355 7C10.7355 7.27333 10.6282 7.51 10.4135 7.71C10.2059 7.90333 9.95543 8 9.66199 8H2.14711V12H11.8091C12.1025 12 12.353 12.1 12.5606 12.3C12.7753 12.4933 12.8827 12.7267 12.8827 13C12.8827 13.2733 12.7753 13.51 12.5606 13.71C12.353 13.9033 12.1025 14 11.8091 14H1.07355C0.780116 14 0.526042 13.9033 0.311331 13.71C0.103777 13.51 0 13.2733 0 13V1C0 0.726667 0.103777 0.493333 0.311331 0.3C0.526042 0.1 0.780116 0 1.07355 0H11.8091Z" fill="url(#paint0_linear)"/>
<path d="M15.0298 1C15.0298 0.726667 15.1335 0.493333 15.3411 0.3C15.5558 0.1 15.8099 0 16.1033 0C16.3968 0 16.6473 0.1 16.8548 0.3C17.0695 0.493333 17.1769 0.726667 17.1769 1V12H26.8389C27.1323 12 27.3828 12.1 27.5903 12.3C27.8051 12.4933 27.9124 12.7267 27.9124 13C27.9124 13.2733 27.8051 13.51 27.5903 13.71C27.3828 13.9033 27.1323 14 26.8389 14H16.1033C15.8099 14 15.5558 13.9033 15.3411 13.71C15.1335 13.51 15.0298 13.2733 15.0298 13V1Z" fill="url(#paint1_linear)"/>
<path d="M41.8686 0C42.1621 0 42.4126 0.1 42.6201 0.3C42.8348 0.493333 42.9422 0.726667 42.9422 1C42.9422 1.27333 42.8348 1.51 42.6201 1.71C42.4126 1.90333 42.1621 2 41.8686 2H32.2066V6H39.7215C40.0149 6 40.2654 6.1 40.473 6.3C40.6877 6.49333 40.7951 6.72667 40.7951 7C40.7951 7.27333 40.6877 7.51 40.473 7.71C40.2654 7.90333 40.0149 8 39.7215 8H32.2066V12H41.8686C42.1621 12 42.4126 12.1 42.6201 12.3C42.8348 12.4933 42.9422 12.7267 42.9422 13C42.9422 13.2733 42.8348 13.51 42.6201 13.71C42.4126 13.9033 42.1621 14 41.8686 14H31.1331C30.8396 14 30.5856 13.9033 30.3709 13.71C30.1633 13.51 30.0595 13.2733 30.0595 13V1C30.0595 0.726667 30.1633 0.493333 30.3709 0.3C30.5856 0.1 30.8396 0 31.1331 0H41.8686Z" fill="url(#paint2_linear)"/>
<path d="M54.8372 0C55.1306 0 55.3811 0.1 55.5886 0.3C55.8034 0.493333 55.9107 0.726667 55.9107 1C55.9107 1.27333 55.8034 1.51 55.5886 1.71C55.3811 1.90333 55.1306 2 54.8372 2H50.5429C49.0614 2 47.7946 2.49 46.7426 3.47C45.6976 4.44333 45.1752 5.62 45.1752 7C45.1752 8.38 45.6976 9.56 46.7426 10.54C47.7946 11.5133 49.0614 12 50.5429 12H54.8372C55.1306 12 55.3811 12.1 55.5886 12.3C55.8034 12.4933 55.9107 12.7267 55.9107 13C55.9107 13.2733 55.8034 13.51 55.5886 13.71C55.3811 13.9033 55.1306 14 54.8372 14H50.5429C48.4674 14 46.696 13.3167 45.2288 11.95C43.7617 10.5833 43.0281 8.93333 43.0281 7C43.0281 5.06667 43.7617 3.41667 45.2288 2.05C46.696 0.683333 48.4674 0 50.5429 0H54.8372Z" fill="url(#paint3_linear)"/>
<path d="M65.5727 13C65.5727 13.2733 65.4653 13.51 65.2506 13.71C65.0431 13.9033 64.7926 14 64.4991 14C64.2057 14 63.9516 13.9033 63.7369 13.71C63.5294 13.51 63.4256 13.2733 63.4256 13V2H59.1314C58.8379 2 58.5839 1.90333 58.3692 1.71C58.1616 1.51 58.0578 1.27333 58.0578 1C58.0578 0.726667 58.1616 0.493333 58.3692 0.3C58.5839 0.1 58.8379 0 59.1314 0H69.8669C70.1604 0 70.4109 0.1 70.6184 0.3C70.8331 0.493333 70.9405 0.726667 70.9405 1C70.9405 1.27333 70.8331 1.51 70.6184 1.71C70.4109 1.90333 70.1604 2 69.8669 2H65.5727V13Z" fill="url(#paint4_linear)"/>
<path d="M73.0876 1C73.0876 0.726667 73.1914 0.493333 73.3989 0.3C73.6136 0.1 73.8677 0 74.1611 0H81.676C82.8641 0 83.8768 0.39 84.7142 1.17C85.5516 1.95 85.9702 2.89333 85.9702 4C85.9702 5.10667 85.5516 6.05 84.7142 6.83C83.8768 7.61 82.8641 8 81.676 8H77.7361L85.3368 12.08C85.4514 12.1333 85.5587 12.2033 85.6589 12.29C85.8665 12.49 85.9702 12.7267 85.9702 13C85.9702 13.2733 85.8665 13.51 85.6589 13.71C85.4514 13.9033 85.1973 14 84.8967 14C84.6891 14 84.5066 13.9533 84.3492 13.86L75.2347 8.96V13C75.2347 13.2733 75.1273 13.51 74.9126 13.71C74.7051 13.9033 74.4546 14 74.1611 14C73.8677 14 73.6136 13.9033 73.3989 13.71C73.1914 13.51 73.0876 13.2733 73.0876 13V1ZM75.2347 2V6H81.676C82.2701 6 82.7746 5.80667 83.1897 5.42C83.612 5.02667 83.8231 4.55333 83.8231 4C83.8231 3.44667 83.612 2.97667 83.1897 2.59C82.7746 2.19667 82.2701 2 81.676 2H75.2347Z" fill="url(#paint5_linear)"/>
<path d="M94.5694 3.56L90.812 12H98.3269L94.5694 3.56ZM89.1909 14C88.8975 14 88.6434 13.9033 88.4287 13.71C88.2211 13.51 88.1173 13.2733 88.1173 13C88.1173 12.8333 88.1567 12.68 88.2354 12.54L93.5066 0.75H93.5173C93.5603 0.583333 93.6569 0.43 93.8072 0.29C94.0147 0.0966667 94.2652 0 94.5587 0C94.8521 0 95.1062 0.0966667 95.3209 0.29C95.4783 0.443333 95.575 0.613333 95.6108 0.8L95.6537 0.79L100.957 12.68H100.946C100.982 12.78 101 12.8867 101 13C101 13.2733 100.893 13.51 100.678 13.71C100.47 13.9033 100.22 14 99.9264 14H89.1909Z" fill="url(#paint6_linear)"/>
<defs>
<linearGradient id="paint0_linear" x1="50.5" y1="0" x2="50.5" y2="14" gradientUnits="userSpaceOnUse">
<stop stop-color="#6686FF"/>
<stop offset="1" stop-color="#8F8DE2"/>
</linearGradient>
<linearGradient id="paint1_linear" x1="50.5" y1="0" x2="50.5" y2="14" gradientUnits="userSpaceOnUse">
<stop stop-color="#6686FF"/>
<stop offset="1" stop-color="#8F8DE2"/>
</linearGradient>
<linearGradient id="paint2_linear" x1="50.5" y1="0" x2="50.5" y2="14" gradientUnits="userSpaceOnUse">
<stop stop-color="#6686FF"/>
<stop offset="1" stop-color="#8F8DE2"/>
</linearGradient>
<linearGradient id="paint3_linear" x1="50.5" y1="0" x2="50.5" y2="14" gradientUnits="userSpaceOnUse">
<stop stop-color="#6686FF"/>
<stop offset="1" stop-color="#8F8DE2"/>
</linearGradient>
<linearGradient id="paint4_linear" x1="50.5" y1="0" x2="50.5" y2="14" gradientUnits="userSpaceOnUse">
<stop stop-color="#6686FF"/>
<stop offset="1" stop-color="#8F8DE2"/>
</linearGradient>
<linearGradient id="paint5_linear" x1="50.5" y1="0" x2="50.5" y2="14" gradientUnits="userSpaceOnUse">
<stop stop-color="#6686FF"/>
<stop offset="1" stop-color="#8F8DE2"/>
</linearGradient>
<linearGradient id="paint6_linear" x1="50.5" y1="0" x2="50.5" y2="14" gradientUnits="userSpaceOnUse">
<stop stop-color="#6686FF"/>
<stop offset="1" stop-color="#8F8DE2"/>
</linearGradient>
</defs>
</svg>
</a>
                    <h1 style="margin:0 auto">Wellcome!</h1>
                    <span  style="color: #333333; font: 18px Arial, sans-serif; line-height: 30px; -webkit-text-size-adjust:none; display: block;">
                    We are glad to see you in our store!</span>
                    <a href=${unsubscribeUrl} style="color: #333333; font: 10px Arial, sans-serif; line-height: 30px; -webkit-text-size-adjust:none; display: block;" target="_blank">Unsubscribe</a>
                </td>
             </tr>
         </table>
         </body></html>`;

  return mailBody;
};
