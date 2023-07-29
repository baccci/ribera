//@ts-ignore  
import font2base64 from 'node-font2base64';

type OrderContent = {
  _id?: string;
  code: string;
  name: string;
  cost: number;
  available: boolean;
  quantity: number;
  description: string;
  imagePath: string;
}

const rawsonRegular = font2base64.encodeToDataUrlSync('fonts/rawson/RawsonRegular.otf');
const rawsonSemiBold = font2base64.encodeToDataUrlSync('fonts/rawson/RawsonSemiBold.otf');
const rawsonBold = font2base64.encodeToDataUrlSync('fonts/rawson/RawsonBold.otf');
const rawsonExtraBoldItalic = font2base64.encodeToDataUrlSync('fonts/rawson/RawsonExtraBoldIt.otf');

const generateHTML = (orderContent: OrderContent[], totalPrice: number, table: number) => {
  const styles = `
  body {
    width: 620px;
    min-height: 600px;
    font-family: "Rawson", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  }
  
  :root{
    /* Colors */
    --yellow: #FFB000;
    --light-yellow: rgba(255, 243, 217, .7);
    --black: #1D1D1D;
    --gray: #3D3D3D;
    --light-gray: #979797;
    --light-gray2: #F8F8F8;
    --light-gray3: #EBEBEB;
  }

  @font-face { 
    font-family: 'Rawson';
    src: url(${rawsonRegular}) format('otf');
    font-weight: 400;
    font-style: normal;
  }

  @font-face { 
    font-family: 'Rawson';
    src: url(${rawsonSemiBold}) format('otf');
    font-weight: 600;
    font-style: normal;
  }
  @font-face { 
    font-family: 'Rawson';
    src: url(${rawsonBold}) format('otf');
    font-weight: 700;
    font-style: normal;
  }

  @font-face { 
    font-family: 'Rawson';
    src: url(${rawsonExtraBoldItalic}) format('otf');
    font-weight: 800;
    font-style: italic;
  }

  .modal{
    position: relative;
    background-color: white;
    border-radius: 10px;
    padding: 30px 50px;
  }
  .modalClose{
    position: absolute;
    top: 20px;
    right: 20px;
  }
  .logoWrapper{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 30px;
    margin-top: 20px;
  }
  .slogan{
    font-size: 12px;
    font-weight: 800;
    font-style: italic;
    color: var(--yellow);
    margin-top: 16px;
  }

  .ticketTitle{
    margin: 0;
    padding: 0;
    font-size: 20px;
    font-weight: 700;
    color: var(--black);
    margin-bottom: 20px;
  }
  .ticketTable{
    box-sizing: border-box;
    width: 100%;
    border-collapse: collapse;
    border-radius: 10px;
    overflow: hidden;
    border-spacing: 0;
  }
  .ticketTable_head{
    height: 32px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .ticketTable_head > th{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    box-sizing: border-box;
    background-color: #f2f2f2;
    font-weight: 400;
    padding: 10px 5px;
    max-width: 150px;
    
  }
  .ticketTable_head > th:first-child{
    padding-left: 20px;
    border-bottom-left-radius: 10px;
    border-top-left-radius: 10px;
  }
  .ticketTable_head > th:last-child{
    padding-right: 20px;
    border-bottom-right-radius: 10px;
    border-top-right-radius: 10px;
  }
  .ticketTable_row:first-child{
    padding-top: 20px;
  }
  .ticketTable_row > td:first-child{
    padding: 10px;
  }
  .ticketTable_row > td{
    max-width: 150px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding: 10px;
    overflow: hidden;
    white-space: nowrap;
  }
  .ticketTable_row > td:last-child{
    font-weight: 600;
  }
  .ticketTable_row > td:first-child{
    padding-left: 28px;
  }
  .itemsWrapper{
    width: 100%;
    margin: 10px 0;
  }
  .bottom{
    display: flex;
    justify-content: space-between;
    padding-right: 20px;
    gap: 40px;
  }
  .value{
    padding-right: 20px;
  }
  .key, .value{
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 20px;
    font-weight: 600;
    color: var(--gray);
  }
  .key{
    padding-left: 20px;
    align-items: flex-start;
  }
  .key > p, .value > p{
    margin: 0;
  }
  .total{
    font-size: 25px;
    font-weight: 600;
    color: var(--gray);
  }
  .totalPrice{
    font-size: 28px;
    font-weight: 700;
    color: var(--gray);
    position: relative;
    top: -4px;
  }
  .buttonWrapper{
    margin-top: 50px;
    width: 100%;
    display: flex;
    justify-content: center;
  }
  .checkoutLine{
    width: 100%;
    margin: 15px 0;
    background-color: #D8D8D8;
    color: #D8D8D8;
    border: 1px solid #D8D8D8;
  }
  `;

  const html = `
    <html>
      <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>TicketPDF</title>
        <style type="text/css" media="screen">
          ${styles}
        </style>
      </head>
      <body>
        <div class="modal">
        <div class="logoWrapper">
          <svg width=100.9 height=56.57  viewBox='0 0 111.456 62.489'>
            <g clipPath="url(#clip-path)">
              <path d="M53.861,68.126c-.019-.011-.2.123-.221.134-.164.1-.33.2-.494.3a10.761,10.761,0,0,1-1.6.826,10.971,10.971,0,0,1-1.734.535,13.817,13.817,0,0,1-4.018.334,10.229,10.229,0,0,1-7-3.82,25.894,25.894,0,0,1-2.709-3.8c-1.767-3.1-3.258-6.335-4.8-9.55-1.076-2.251-1.048-2.178,1.133-3.37,6.411-3.506,10.047-8.856,10.332-16.233.259-6.719-5.3-13.133-12.715-14.771A25.487,25.487,0,0,0,8.032,23.814C3.675,27.2.743,31.636.225,37.317a8.978,8.978,0,0,0,6.542,9.825c7.144,2,14.982-3.752,15.161-11.2a8.282,8.282,0,0,0-.7-3.692,6.8,6.8,0,0,0-1.008-1.564,7.609,7.609,0,0,0-.976-.922,5.435,5.435,0,0,0-1.141-.78c-.043-.02-.085-.041-.127-.062,0,0-.177.387-.231.5l-.515,1.081-.744,1.563-.323.679a5.112,5.112,0,0,1,.461.3,3.054,3.054,0,0,1,.407.385,3.018,3.018,0,0,1,.528.815,4.969,4.969,0,0,1,.343,1.958c0,.025,0,.05,0,.075a6.632,6.632,0,0,1-.621,2.625,7.912,7.912,0,0,1-3.538,3.732c-2.481,1.273-5.076,1.5-7.419-.267C3.83,40.487,3.887,37.8,4.444,35.058a5.7,5.7,0,0,1,.321-.949,18,18,0,0,1,8.71-9.325,21.349,21.349,0,0,1,15.382-2.073c.863.206,1.531.414.884,1.648-3.591,6.857-6.62,13.983-9.892,20.993a31.754,31.754,0,0,1-5.248,8.5c-3.3,3.526-7.26,5.487-12.236,4.594a6.258,6.258,0,0,1-.741-.215L0,61.949s.568.253.706.289a15.164,15.164,0,0,0,3.737.472,14.972,14.972,0,0,0,3.678-.536,18.436,18.436,0,0,0,5.4-2.344,20.888,20.888,0,0,0,4.521-3.981c2.807-3.264,4.42-7.192,6.227-11.012,2.9-6.139,5.769-12.3,8.662-18.439.786-1.67.864-1.67,2.305-.445a9.1,9.1,0,0,1,3.273,5.473c1.182,6.754-4.113,14.482-10.972,16-.353.078-1.074.32-1.074.32a11.862,11.862,0,0,0-.963,2.214,3.055,3.055,0,0,0,.325.973C28.282,56.236,30.81,61.5,33.56,66.666a14.33,14.33,0,0,0,9.229,7.4,14.005,14.005,0,0,0,1.779.324,15.584,15.584,0,0,0,8.869-1.723,20.6,20.6,0,0,0,3.784-2.589l-3.36-1.958" transform="translate(0 -11.999)" fill="#ffb000" />
              <path d="M185.31,113.98a4.732,4.732,0,0,0-3.162,1.7,2.628,2.628,0,0,1-3.928.573c-2.6-1.642-4.744-1.351-6.885.878a2.667,2.667,0,0,1-3.836.438c-2.606-1.618-4.689-1.334-6.891.907a2.61,2.61,0,0,1-3.685.516c-2.874-1.739-4.77-1.471-7.145.924a2.518,2.518,0,0,1-3.564.4c-2.8-1.745-4.769-1.484-7.135.928a2.539,2.539,0,0,1-3.562.438c-2.886-1.729-4.777-1.487-7.154.9a2.45,2.45,0,0,1-3.551.413,4.981,4.981,0,0,0-3.605-1.045,1.345,1.345,0,0,0-1.321,1.441,1.169,1.169,0,0,0,1.286,1.237,3.987,3.987,0,0,1,2.043.607c3.1,1.7,4.708,1.5,7.286-1.013a2.5,2.5,0,0,1,3.311-.466c3.294,1.839,4.758,1.678,7.407-.877a2.527,2.527,0,0,1,3.446-.379c3.007,1.781,4.7,1.548,7.264-.952a2.537,2.537,0,0,1,3.456-.383c2.979,1.767,4.761,1.572,7.142-.821a2.578,2.578,0,0,1,3.559-.52c3.036,1.769,4.664,1.545,7.308-.9a2.417,2.417,0,0,1,3.3-.384,5.253,5.253,0,0,0,3.21,1.109,4.418,4.418,0,0,0,3-.987c1.024-.84,1.87-1.869,3.248-2.249a1.1,1.1,0,0,0,.608-1.539,1.3,1.3,0,0,0-1.454-.883" transform="translate(-79.748 -75.812)" fill="#ffb000" />
              <path d="M184.72,28.264a4.715,4.715,0,0,1-1.909,2.473c-.575.38-1.265.72-1.852.238-.63-.518-.036-1.133.188-1.656,2.186-5.118,4.367-10.238,6.613-15.329.042-.1.078-.183.111-.268l.471-.93h-4.267l-.44,1.008h0l-.01.012-.023.027-.05-.048-.018-.018-.024-.023-.029-.027-.035-.031-.04-.034-.045-.038-.05-.041-.056-.043-.061-.045-.065-.046-.07-.048-.075-.048-.08-.049-.084-.048-.089-.048-.093-.047-.1-.046-.1-.044-.106-.042-.111-.039-.115-.036-.118-.033-.123-.029-.127-.025c-.043-.008-.087-.014-.13-.02s-.089-.011-.134-.015-.091-.007-.137-.01-.094,0-.141,0-.1,0-.144,0-.1.005-.148.009-.1.01-.151.016-.1.015-.154.024-.105.02-.158.031-.107.025-.161.04-.109.031-.163.049c-.09.029-.246.068-.246.068a7.3,7.3,0,0,0-1.574.693,11.985,11.985,0,0,0-4.887,5.979c-1.578,3.5-3.042,7.055-4.554,10.587a7.6,7.6,0,0,1-1.183,2.2c-.432.482-.972.858-1.613.5-.589-.327-.257-.9-.129-1.354a14.1,14.1,0,0,1,.566-1.565c1.49-3.6,3.03-7.18,4.47-10.8,1.1-2.762-.215-4.476-3.193-4.3l-1.788.1c.287-.84.976-2.6,1.008-2.686h-3.605c-.008.019-3.812,8.645-4.844,10.948-.881,1.965-1.8,3.912-2.793,5.823a18.317,18.317,0,0,1-2.7,4.127,7.179,7.179,0,0,1-4.231,2.363,3.005,3.005,0,0,1-3.043-1.193,2.587,2.587,0,0,1,.393-2.806,5.3,5.3,0,0,1,2.531-1.549c.954-.311,1.947-.5,2.884-.853a10.362,10.362,0,0,0,6.052-7.537,4.875,4.875,0,0,0-.36-3.705,3.837,3.837,0,0,0-2.289-1.519,7.153,7.153,0,0,0-6.606,2.239,19.439,19.439,0,0,0-3.7,6.244c-1.308,3.075-2.525,6.2-4.111,9.14-.6,1.112-1.447,2.324-2.708,2.4q2.045-4.925,4.251-9.782a12.97,12.97,0,0,0,1.311-3.945,4.281,4.281,0,0,0-1.324-3.78,5.78,5.78,0,0,0-4.248-.788,34.816,34.816,0,0,1,3.918-6.977,1.737,1.737,0,0,1,.8-.714,1.815,1.815,0,0,1,1.237.223,21.284,21.284,0,0,0,9.8,2.213,10.985,10.985,0,0,0,5.461-1.849,7.205,7.205,0,0,0,3.244-4.8,6.084,6.084,0,0,0-.149-2.243C161.561,1.659,159.6.586,157.228.207A11.029,11.029,0,0,0,155.409,0a19.527,19.527,0,0,0-12.5,4.447,2.442,2.442,0,0,1-2.837.454,25.242,25.242,0,0,0-5.483-1.451,11.959,11.959,0,0,0-12.91,6.262,6.408,6.408,0,0,0,1.2,7.676,7.3,7.3,0,0,0,8.009.369A3.251,3.251,0,0,0,132.4,14.3a1.965,1.965,0,0,0-1.854-1.657,3.125,3.125,0,0,0-3.2,1.687,5.929,5.929,0,0,0-.5,1.231c-.174.518.268,1.326-.679,1.471a1.975,1.975,0,0,1-1.869-.885c-1.166-1.4-1.124-3.116.03-5.127,2.784-4.85,9.677-4.851,13.705-2.631.676.373.463.707.145,1.184-2.5,3.732-4.006,7.944-5.786,12.022-1.893,4.338-3.737,8.7-5.656,13.023a8.187,8.187,0,0,1-2.536,3.473c-.51.37-1.111.722-1.688.336-.666-.445-.276-1.124-.068-1.67.335-.882.76-1.73,1.135-2.6,1.5-3.47,3-6.941,4.543-10.524l1.727-4-4.263.045L124.543,22.1h0c-.022.052-.044.1-.065.156-1.615,4.028-3.367,8-5.1,11.985a16.492,16.492,0,0,0-1.1,3.318c-.61,3.031.918,4.913,3.96,4.944a6.467,6.467,0,0,0,4.323-1.5c.4-.329.675-.583,1.285-.246a5.955,5.955,0,0,0,6.732-.637c.756-.539,1.242-1,1.919.082.29.461.97.423,1.554.34a6.561,6.561,0,0,0,3.628-1.922c.379-.359.63-.751,1.39-.44a11.341,11.341,0,0,0,14.054-4.015,22.9,22.9,0,0,0,2.516-4.51c1.556-3.574,3.137-7.138,4.641-10.734.515-1.232,1.548-1.118,2.361-.863.913.286.331,1.121.112,1.7-.335.884-.754,1.735-1.109,2.612-1.249,3.095-2.924,6.017-3.844,9.241a4.168,4.168,0,0,0,1,4.491,4.41,4.41,0,0,0,4.577.635,6.257,6.257,0,0,0,1.547-.953c.352-.25.573-.621,1.143-.338a6.361,6.361,0,0,0,7.176-.876c.434-.335.7-.24,1.158-.023a5.945,5.945,0,0,0,6.583-.826c2.71-2.16,3.927-5.253,5.058-8.443-2.615-.266-4.484.43-5.328,2.98m-36.128-2.593c.828-1.866,1.48-3.846,3.093-5.246a1.8,1.8,0,0,1,1.869-.356.9.9,0,0,1,.556.928c.1,2.2-2.758,5.255-4.943,5.327-.534.017-.791-.164-.574-.653m7.495-21.62c.882.086,1.861.324,2.122,1.337a2.3,2.3,0,0,1-1.266,2.5,6.935,6.935,0,0,1-4.476.982,17.672,17.672,0,0,1-6.554-1.633,13.939,13.939,0,0,1,10.175-3.187M134.093,35.009a4.309,4.309,0,0,1-2.886,2.515c-1.221-.113-1-.932-.757-1.592.517-1.4,1.128-2.772,1.721-4.147.9-2.087,1.776-4.187,2.745-6.243A6.345,6.345,0,0,1,137.8,22.42a1.2,1.2,0,0,1,1.411-.02c.437.386.136.867-.02,1.234-1.631,3.823-3.1,7.72-5.1,11.375m41.653-4.151a3.274,3.274,0,0,1-.837.806c-.6.431-1.327.839-1.983.307-.638-.518-.227-1.223.055-1.828,1.69-3.623,3.1-7.375,4.989-10.9a4.177,4.177,0,0,1,2.344-2.245c.935-.3,1.561-.09,1.4,1.08a.626.626,0,0,1-.024.165q-.356.8-.7,1.609l-.069.158h0c-1.555,3.7-2.953,7.472-5.184,10.851" transform="translate(-78.592 0)" fill="#ffb000" />
            </g>
          </svg>
          <h2 class="slogan">TODO ESTÁ BIEN!</h2>
        </div>
        <p class="ticketTitle">Tu pedido</p>
        <table class="ticketTable">
          <thead>
            <tr class="ticketTable_head">
              <th>cant</th>
              <th>producto</th>
              <th>descripción</th>
              <th>precio unitario</th>
              <th>importe</th>
            </tr>
          </thead>
          <tbody>
            ${(orderContent.map(
              ({ quantity, name, cost, description }) =>
                `<tr class="ticketTable_row">
                <td>${quantity}</td>
                <td>${name}</td>
                <td>${description}</td>
                <td>$${cost}</td>
                <td>$${cost * quantity}</td>
              </tr>
            `
            )).toString().replace(/,/g, '')}
          </tbody>
        </table>
        <div class="itemsWrapper">
            <div class="bottom">
              <div class="key">
                <p>Mesa</p>
                <p>Envío</p>
                <p>Descuento</p>
                <h2 class="total">Total</h2>
              </div>
              <div class="value">
                <p>${table}</p>
                <p>$0</p>
                <p>-$${totalPrice * 0.2}</p>
                <h2 class="totalPrice">$${totalPrice * 0.8}</h2>
              </div>
            </div>
        </div>
      </div>
      </body>
    </html>
  `;
  return html;
};

export default generateHTML;