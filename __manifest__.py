{
    'name': 'Porfolio dev',
    'version': '19.0',
    'summary': 'Porfolio dev',

    'category': 'Customization',
    'description': """
    """,

    'author': 'Daniel Marchessi',
    'license': 'OPL-1',
    'depends': [
        'base',
        'web',
        'website',
    ],

    "data": [
        "views/home_page.xml",
    ],

    "assets": {
        "web.assets_frontend": [
            "web_portfolio_dev/static/src/game/port_game.js",
            "web_portfolio_dev/static/src/game/port_game.scss",
            "web_portfolio_dev/static/src/game/port_game.xml",
        ],
    },
    'application': True,
    'installable': True,
    'auto_install': False,
}
