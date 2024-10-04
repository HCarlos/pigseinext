"use client"

export function refreshNavigator(data, router, url){
    router.push(url);
    router.refresh();
   // location.reload();
}
