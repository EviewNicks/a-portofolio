 GET /admin/projects/new?secret=Ardiansy4 200 in 347ms (next.js: 142ms, proxy.ts: 21ms, application-code: 185ms)
[POST /api/projects] Error [PrismaClientKnownRequestError]: 
Invalid `prisma.project.create()` invocation:


Unique constraint failed on the fields: (`github_repo_url`)
    at Gr.handleRequestError (generated\prisma\runtime\client.js:69:8286)
    at Gr.handleAndLogRequestError (generated\prisma\runtime\client.js:69:7581)
    at Gr.request (generated\prisma\runtime\client.js:69:7288)
    at async a (generated\prisma\runtime\client.js:79:6730)
    at async POST (app\api\projects\route.ts:49:21)
  67 | ...
  68 | ...
> 69 | ...t u=s?{modelName:s,...t.meta}:t.meta;throw new b.PrismaClientKnownRequestError(l,{code...
     |                                               ^
  70 | ...
  71 | ...
  72 | ... {
  code: 'P2002',
  meta: {
    modelName: 'Project',
    driverAdapterError: Error [DriverAdapterError]: UniqueConstraintViolation
        at async e.interpretNode (generated\prisma\runtime\client.js:15:44573)
        at async e.interpretNode (generated\prisma\runtime\client.js:15:45017)
        at async e.interpretNode (generated\prisma\runtime\client.js:15:46237)
        at async e.run (generated\prisma\runtime\client.js:15:43287)
        at async e.execute (generated\prisma\runtime\client.js:61:815)
        at async jt.request (generated\prisma\runtime\client.js:62:2327)
        at async Object.singleLoader (generated\prisma\runtime\client.js:69:6569)
        at async Gr.request (generated\prisma\runtime\client.js:69:7175)
        at async a (generated\prisma\runtime\client.js:79:6730)
        at async POST (app\api\projects\route.ts:49:21)
      13 | ...
      14 | ...
    > 15 | ...r(let o of n){let s=Ra(o,r.sqlCommenter),a=await this.#u(s,r.queryable,()=>r.queryable...
         |                                               ^
      16 | ...
      17 | ...
      18 | ... {
      [cause]: [Object]
    }
  },
  clientVersion: '7.5.0'
}
 POST /api/projects?secret=Ardiansy4 500 in 1400ms (next.js: 96ms, application-code: 1304ms)
