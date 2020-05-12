# casperjs
Ancestry Webscraping Download multiple IMAGES/PAGES from lists

In order to use this script, you must have installed CasperJS and BetterDownload.

CasperJS - https://www.casperjs.org/
BetterDownload - https://www.npmjs.com/package/casperjs-better-download

To use this list you need to find a list that you want, go to the page viewer and analize the URL.
At the end of the link you will find a numerical string related to the size of that entire range.

Ex.: https://www.ancestry.com/...imageId=K_1717_080476-0629

The K_1717_080476 corresponds to the collection or list.
While the 0629 corresponds to the page position in that set of files. What you have to do is to define the first and last positions that you want to download. The first (usually "1") is defined in variable "result", where you add it to the variable "i". The last is defined in the "while" function, where "i< FINAL NUMBER".
It is important that you leave variable "adic" with a value of a decrement from the initial number. So let's say your first page is really 1, "adic" will be 0.

The script will replace the collection and page position (080476-0629) with the collection+variable result ("080476-"+result).

The script captures the screens and selectors during the process so you can confirm it is working. However you can disable that.

The script will click in the download to your computer button and get the downloading link. This link triggers automatically the image downloading, so the script replaces the "download" string in the link with "view". Thus, allowing it to be oppened and downloaded with BetterDownload.


Any queations, please ask.
Have fun and good luck! =)
