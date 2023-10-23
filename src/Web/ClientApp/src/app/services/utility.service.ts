import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { fromEvent, Observable, of, Subject } from 'rxjs';
import { Location } from "@angular/common";
// import { format } from 'date-fns';
// import { GetCommunityByOrgCodeDto, GetUserPagePermissionsDto } from '../slickwork-api';

@Injectable()
export class UtilityService {
  public _router: Router;
  tempMainOptChange = new Subject();
  constructor(router: Router,
    private _route: ActivatedRoute,
    private location: Location) {
    this._router = router;
  }

  public goBack() {
    this.location.back();
  }

  // public convertDateTime(date: Date) {
  //   const _formattedDate = new Date(date.toString());
  //   return _formattedDate.toDateString();
  // }

  public navigate(path: string) {
    this._router.navigate([path]);
  }

  public getParams() {
    const searchParams = window.location.search.split('?')[1];
    if (searchParams) {
      const paramsObj: any = {};

      searchParams.split('&').forEach(i => {
        paramsObj[i.split('=')[0]] = i.split('=')[1];
      });
      return paramsObj;
    }
    return undefined;
  }

  public navigateToPortal() {
    this.navigate('/');
  }
  toQueryParams(obj: any): string {
    return Object.keys(obj)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]))
      .join('&');
  }

  public fromQueryParams(queryString: string): Object {
    const query: any = {};
    const pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
    for (let i = 0; i < pairs.length; i++) {
      const pair = pairs[i].split('=');
      query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
    }
    return query;
  }

  public downloadFile(response: any) {
    var blob = new Blob([response.data], { type: 'application/octet-stream' });
    var url = window.URL.createObjectURL(blob);
    var a = document.createElement('a');
    document.body.appendChild(a);
    a.setAttribute('style', 'display: none');
    a.href = url;
    a.download = response.fileName;
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }

  public replaceQueryParams(queryParams: any){
    // changes the route without moving from the current view or
    // triggering a navigation event,\
    this._router.navigate(
      [], 
      {
        relativeTo: this._route,
        queryParams: queryParams,
        queryParamsHandling: 'merge'
      });
  }

  public clearQueryParams(){
    // changes the route without moving from the current view or
    // triggering a navigation event,\
    this._router.navigate(
      [], 
      {
        relativeTo: this._route,
        queryParams: null,
        queryParamsHandling: 'merge'
      });
  }
//   printPDFFileFromUrl(url: string) {
//     this.dataService.getFile(url).subscribe(
//       (response: any) => { // download file
//         var blob = new Blob([response], { type: 'application/pdf' });
//         const blobUrl = URL.createObjectURL(blob);
//         const iframe = document.createElement('iframe');
//         iframe.style.display = 'none';
//         iframe.src = blobUrl;
//         document.body.appendChild(iframe);
//         iframe.contentWindow.print();
//       });
//   }

//   printPDFFileFromBlob(b: FileResponse) {
//     var blob = new Blob([b.data], { type: 'application/pdf' });
//     const blobUrl = URL.createObjectURL(blob);
//     const iframe = document.createElement('iframe');
//     iframe.style.display = 'none';
//     iframe.src = blobUrl;
//     document.body.appendChild(iframe);
//     iframe.contentWindow.print();
//   }


  // setCachedUserPermissionList(list: GetUserPagePermissionsDto[]): void {
  //   localStorage.setItem("cachedUserPermissions", JSON.stringify(list));
  // }

  // getCachedUserPermissionList(): GetUserPagePermissionsDto[] {
  //   let cached = localStorage.getItem("cachedUserPermissions");
  //   return JSON.parse(cached);
  // }

  // setCachedCommunity(item: GetCommunityByOrgCodeDto): void{
  //   localStorage.setItem("cachedCommunity", JSON.stringify(item));
  // }

  // getCachedCommunity(): GetCommunityByOrgCodeDto {
  //   let cached = localStorage.getItem("cachedCommunity");
  //   return JSON.parse(cached);
  // }

}
