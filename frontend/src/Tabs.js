import React, {useState} from 'react'

export default function WithStateHook() {

    const [currentTab, setCurrentTab] = useState('tab1');
    const tabList = [
        {
            name: 'veggieTab',
            label: 'Vegetables',
            content: (
                <div className="Vegetables">
                    <h2>Vegetables</h2>
                    <table>
                        <tr>
                            <th>Ingredient Name</th>

                            <th>Alter Inventory</th>
                        </tr>
                        <tr>
                            <td>Banana Peppers</td>
                            <td>
                                <input
                                    onKeyPress={(event) => {
                                        if (!/[0-9]/.test(event.key)) {
                                            event.preventDefault();
                                        }
                                    }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Brocolli</td>
                            <td>
                                <input
                                    onKeyPress={(event) => {
                                        if (!/[0-9]/.test(event.key)) {
                                            event.preventDefault();
                                        }
                                    }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Cauliflower</td>
                            <td>
                                <input
                                    onKeyPress={(event) => {
                                        if (!/[0-9]/.test(event.key)) {
                                            event.preventDefault();
                                        }
                                    }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Green Peppers</td>
                            <td>
                                <input
                                    onKeyPress={(event) => {
                                        if (!/[0-9]/.test(event.key)) {
                                            event.preventDefault();
                                        }
                                    }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Jalapenos</td>
                            <td>
                                <input
                                    onKeyPress={(event) => {
                                        if (!/[0-9]/.test(event.key)) {
                                            event.preventDefault();
                                        }
                                    }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Mushrooms</td>
                            <td>
                                <input
                                    onKeyPress={(event) => {
                                        if (!/[0-9]/.test(event.key)) {
                                            event.preventDefault();
                                        }
                                    }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Onions</td>
                            <td>
                                <input
                                    onKeyPress={(event) => {
                                        if (!/[0-9]/.test(event.key)) {
                                            event.preventDefault();
                                        }
                                    }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Pineapple</td>
                            <td>
                                <input
                                    onKeyPress={(event) => {
                                        if (!/[0-9]/.test(event.key)) {
                                            event.preventDefault();
                                        }
                                    }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Roasted Garlic</td>
                            <td>
                                <input
                                    onKeyPress={(event) => {
                                        if (!/[0-9]/.test(event.key)) {
                                            event.preventDefault();
                                        }
                                    }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Spinach</td>
                            <td>
                                <input
                                    onKeyPress={(event) => {
                                        if (!/[0-9]/.test(event.key)) {
                                            event.preventDefault();
                                        }
                                    }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Tomatoes</td>
                            <td>
                                <input
                                    onKeyPress={(event) => {
                                        if (!/[0-9]/.test(event.key)) {
                                            event.preventDefault();
                                        }
                                    }}
                                />
                            </td>
                        </tr>
                    </table>
                                    <button>
                    ORDER
                </button>
                </div>
            )
        },
        {
            name: 'meatTab',
            label: 'Meats',
            content: (
                <div className="Meats">
                    <h2>Meats</h2>
                    <table>
                        <tr>
                            <th>Ingredient Name</th>

                            <th>Alter Inventory</th>
                        </tr>
                        <tr>
                            <td>Black Forest Ham</td>
                            <td>
                                <input
                                    onKeyPress={(event) => {
                                        if (!/[0-9]/.test(event.key)) {
                                            event.preventDefault();
                                        }
                                    }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Diced Ham</td>
                            <td>
                                <input
                                    onKeyPress={(event) => {
                                        if (!/[0-9]/.test(event.key)) {
                                            event.preventDefault();
                                        }
                                    }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Italian Sausage</td>
                            <td>
                                <input
                                    onKeyPress={(event) => {
                                        if (!/[0-9]/.test(event.key)) {
                                            event.preventDefault();
                                        }
                                    }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Meatball</td>
                            <td>
                                <input
                                    onKeyPress={(event) => {
                                        if (!/[0-9]/.test(event.key)) {
                                            event.preventDefault();
                                        }
                                    }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Pepperoni</td>
                            <td>
                                <input
                                    onKeyPress={(event) => {
                                        if (!/[0-9]/.test(event.key)) {
                                            event.preventDefault();
                                        }
                                    }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Salami</td>
                            <td>
                                <input
                                    onKeyPress={(event) => {
                                        if (!/[0-9]/.test(event.key)) {
                                            event.preventDefault();
                                        }
                                    }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Smoked Chicken</td>
                            <td>
                                <input
                                    onKeyPress={(event) => {
                                        if (!/[0-9]/.test(event.key)) {
                                            event.preventDefault();
                                        }
                                    }}
                                />
                            </td>
                        </tr>
                    </table>
                                    <button>
                    ORDER
                </button>
                </div>
            )
        },
        {
            name: 'sauceTab',
            label: 'Sauces',
            content: (
                <div className="Sauces">
                    <h2>Sauces</h2>
                    <table>
                        <tr>
                            <th>Ingredient Name</th>

                            <th>Alter Inventory</th>
                        </tr>
                        <tr>
                            <td>Alfredo</td>
                            <td>
                                <input
                                    onKeyPress={(event) => {
                                        if (!/[0-9]/.test(event.key)) {
                                            event.preventDefault();
                                        }
                                    }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Traditional BBQ</td>
                            <td>
                                <input
                                    onKeyPress={(event) => {
                                        if (!/[0-9]/.test(event.key)) {
                                            event.preventDefault();
                                        }
                                    }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Zesty Red</td>
                            <td>
                                <input
                                    onKeyPress={(event) => {
                                        if (!/[0-9]/.test(event.key)) {
                                            event.preventDefault();
                                        }
                                    }}
                                />
                            </td>
                        </tr>
                        <button>
                    ORDER
                </button>
                    </table>
                </div>
            )
        },
        {
            name: 'drizzleTab',
            label: 'Drizzles',
            content: (
                <div className="Drizzles">
                    <h2>Drizzles</h2>
                    <table>
                        <tr>
                            <th>Ingredient Name</th>

                            <th>Alter Inventory</th>
                        </tr>
                        <tr>
                            <td>BBQ Sauce</td>
                            <td>
                                <input
                                    onKeyPress={(event) => {
                                        if (!/[0-9]/.test(event.key)) {
                                            event.preventDefault();
                                        }
                                    }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Olive Oil</td>
                            <td>
                                <input
                                    onKeyPress={(event) => {
                                        if (!/[0-9]/.test(event.key)) {
                                            event.preventDefault();
                                        }
                                    }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Oregano</td>
                            <td>
                                <input
                                    onKeyPress={(event) => {
                                        if (!/[0-9]/.test(event.key)) {
                                            event.preventDefault();
                                        }
                                    }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Ranch</td>
                            <td>
                                <input
                                    onKeyPress={(event) => {
                                        if (!/[0-9]/.test(event.key)) {
                                            event.preventDefault();
                                        }
                                    }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Sriracha</td>
                            <td>
                                <input
                                    onKeyPress={(event) => {
                                        if (!/[0-9]/.test(event.key)) {
                                            event.preventDefault();
                                        }
                                    }}
                                />
                            </td>
                        </tr>
                    </table>
                    <button>
                    ORDER
                </button>
                </div>
            )
        },
        {
            name: 'cheeseTab',
            label: 'Cheeses',
            content: (
                <div className="Cheeses">
                    <h2>Cheeses</h2>
                        <tr>
                            <td>House Blend</td>
                            <td>
                                <input
                                    onKeyPress={(event) => {
                                        if (!/[0-9]/.test(event.key)) {
                                            event.preventDefault();
                                        }
                                    }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Parmesan</td>
                            <td>
                                <input
                                    onKeyPress={(event) => {
                                        if (!/[0-9]/.test(event.key)) {
                                            event.preventDefault();
                                        }
                                    }}
                                />
                            </td>
                        </tr>
                        <button>
                        ORDER
                    </button>
                </div>
            )
        },
        {
            name: 'crustTab',
            label: 'Crusts',
            content: (
                <div className="Crusts">
                    <h2>Crusts</h2>
                        <tr>
                            <td>Regular</td>
                            <td>
                                <input
                                    onKeyPress={(event) => {
                                        if (!/[0-9]/.test(event.key)) {
                                            event.preventDefault();
                                        }
                                    }}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>Parmesan</td>
                            <td>
                                <input
                                    onKeyPress={(event) => {
                                        if (!/[0-9]/.test(event.key)) {
                                            event.preventDefault();
                                        }
                                    }}
                                />
                            </td>
                        </tr>
                <button>
                    ORDER
                </button>
                </div>
            )
        }
    ];

    return (
        <div className="simple-tabs">

            <div className="tabs">
                {
                    tabList.map((tab, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentTab(tab.name)}
                            className={(tab.name === currentTab) ? 'active' : ''}>
                            {tab.label}
                        </button>
                    ))
                }
            </div>

            {
                tabList.map((tab, i) => {
                    if (tab.name === currentTab) {
                        return <div key={i}>{tab.content}</div>;
                    } else {
                        return null;
                    }
                })
            }
        </div>
    )
}