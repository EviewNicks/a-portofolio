[Fast Refresh] rebuilding
forward-logs-shared.ts:95 [Fast Refresh] done in 4286ms
installHook.js:1 Error: Invalid src prop (https://onrdpcigvqmsuqspnlhd.supabase.co/storage/v1/object/public/certificates/temp-1782298970186/1782298971202-Screenshot_2026-06-24_190233.png) on `next/image`, hostname "onrdpcigvqmsuqspnlhd.supabase.co" is not configured under images in your `next.config.js`
See more info: https://nextjs.org/docs/messages/next-image-unconfigured-host
    at defaultLoader (image-loader.ts:109:17)
    at get-img-props.ts:265:14
    at Array.map (<anonymous>)
    at generateImgAttrs (get-img-props.ts:263:8)
    at getImgProps (get-img-props.ts:742:25)
    at image-component.tsx:402:64
    at Object.react_stack_bottom_frame (react-dom-client.development.js:28241:20)
    at renderWithHooks (react-dom-client.development.js:7925:22)
    at updateForwardRef (react-dom-client.development.js:10000:19)
    at beginWork (react-dom-client.development.js:12451:18)
    at runWithFiberInDEV (react-dom-client.development.js:986:30)
    at performUnitOfWork (react-dom-client.development.js:18988:22)
    at workLoopSync (react-dom-client.development.js:18816:41)
    at renderRootSync (react-dom-client.development.js:18797:11)
    at performWorkOnRoot (react-dom-client.development.js:17902:35)
    at performWorkOnRootViaSchedulerTask (react-dom-client.development.js:20471:7)
    at MessagePort.performWorkUntilDeadline (scheduler.development.js:45:48)

The above error occurred in the <Unknown> component. It was handled by the <m> error boundary.
overrideMethod @ installHook.js:1
onCaughtError @ error-boundary-callbacks.ts:90
logCaughtError @ react-dom-client.development.js:9713
runWithFiberInDEV @ react-dom-client.development.js:986
(anonymous) @ react-dom-client.development.js:9760
callCallback @ react-dom-client.development.js:7676