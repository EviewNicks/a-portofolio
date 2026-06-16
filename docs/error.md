(base) PS C:\Users\MODERN 14> Invoke-WebRequest -Uri "https://integrate.api.nvidia.com/v1/models" ` -Headers @{"Authorization" = "Bearer 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"} ` -Method GET

Security Warning: Script Execution Risk
Invoke-WebRequest parses the content of the web page. Script code in the web page might be run when the page is
parsed.
      RECOMMENDED ACTION:
      Use the -UseBasicParsing switch to avoid script code execution.

      Do you want to continue?

[Y] Yes  [A] Yes to All  [N] No  [L] No to All  [S] Suspend  [?] Help (default is "N"): y


StatusCode        : 200
StatusDescription : OK
Content           : {"object":"list","data":[{"id":"01-ai/yi-large","object":"model","created":735790403,"owned_by":"01
                    -ai"},{"id":"abacusai/dracarys-llama-3.1-70b-instruct","object":"model","created":735790403,"owned_
                    by...
RawContent        : HTTP/1.1 200 OK
                    Transfer-Encoding: chunked
                    Connection: keep-alive
                    Vary: Origin
                    Content-Type: application/json
                    Date: Sun, 14 Jun 2026 02:56:20 GMT

                    {"object":"list","data":[{"id":"01-ai/yi-large...
Forms             : {}
Headers           : {[Transfer-Encoding, chunked], [Connection, keep-alive], [Vary, Origin], [Content-Type,
                    application/json]...}
Images            : {}
InputFields       : {}
Links             : {}
ParsedHtml        : mshtml.HTMLDocumentClass
RawContentLength  : 11634



(base) PS C:\Users\MODERN 14>

