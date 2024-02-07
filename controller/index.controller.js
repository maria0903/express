module.exports = {
    /**
     * @param {import('express').Request} req 
     * @param {import('express').Response} res 
     * @param {import('express').NextFunction} next 
     */
    IndexController: async (req, res, next) => {
        res.status(200).send(`
            <html>
                <head>
                    <title>Express</title>
                    <style>
                        a {
                            color: black;
                        }
                        .center {
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                        }
                    </style>
                </head>
                <body class="center">
                    <div class="center">
                        <h1>Generate random Cat or Dog</h1>
                        <div style="display: flex; gap: 1rem;">
                            <div>
                                <a href="/generate/cat">Cat</a>
                                <nav style="display: flex; gap: 1rem; border: 1px solid #eee; padding: 0.5rem;">
                                    <a href="/generate/cat?limit=1">Create 1</a>
                                    <a href="/generate/cat?limit=10">Create 10</a>
                                </nav>
                            </div>
                            <div>
                                <a href="/generate/dog">Dog</a>
                                <nav style="display: flex; gap: 1rem; border: 1px solid #eee; padding: 0.5rem;">
                                    <a href="/generate/dog?limit=1">Create 1</a>
                                    <a href="/generate/dog?limit=10">Create 10</a>
                                </nav>
                            </div>
                        </div>
                    </div>
                </body>
            </html>
        `)
    
        next();
    }
}