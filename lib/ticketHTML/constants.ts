//  @ts-ignore
import font2base64 from 'node-font2base64'

const rawsonRegular = font2base64.encodeToDataUrlSync('fonts/rawson/RawsonRegular.otf')
const rawsonSemiBold = font2base64.encodeToDataUrlSync('fonts/rawson/RawsonSemiBold.otf')
const rawsonBold = font2base64.encodeToDataUrlSync('fonts/rawson/RawsonBold.otf')
const rawsonExtraBoldItalic = font2base64.encodeToDataUrlSync('fonts/rawson/RawsonExtraBoldIt.otf')

export const styles = `
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
  `