import TypeResponseTicket from "../types-data/type-response-ticket";
import { receiveErrorSearchId } from "../helpers/vars/errorMessage";

const baseUrl = 'https://aviasales-test-api.kata.academy/';

const getResource = (additionUrl: string, options = {}): any => {
  const url = baseUrl + additionUrl;
  return fetch(url, options);
}

export const getSearchId = async () => {
  const responseSearchId = await getResource('search');
  if (!responseSearchId.ok) throw new Error(receiveErrorSearchId);
  const responseSearchIdObj: {searchId:string} = responseSearchId.json();
  return responseSearchIdObj;
}

export const getTicket = async (searchId: string) => {
  try {
    const responseTicket = await getResource(`tickets?searchId=${searchId}`);
    if (!responseTicket.ok) throw responseTicket;
    const responseTicketObj: TypeResponseTicket = responseTicket.json();
    return responseTicketObj
  } catch (e: any) {
    return e.ok;
  }
}