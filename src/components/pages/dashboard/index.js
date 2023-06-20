import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import jwt from 'jwt-decode';

import Page from '../../../components/components/container';
import Footer from '../../components/footer';
import Informations from './menu/Informations';
import History from './menu/History';
import Wishlist from './menu/Wishlist';

// import { t } from '../../../i18n/translate';

import { getUserDetails } from './actions';

import {
  asideItems,
  dashboard,
  asideSection,
  mainSection,
} from './styles.module.scss';

function Dashboard() {
  const dispatch = useDispatch();
  const [menu, setMenu] = useState('wish');

  const { favorites } = useSelector((state) => state?.basket);
  const { orders } = useSelector((state) => state?.user?.user?.orders);
  const profile = useSelector((state) => state?.tokens?.tokens?.token);

  useEffect(() => {
    const { id } = jwt(profile);
    dispatch(getUserDetails(id));
  }, [dispatch, profile]);

  const sideMenuList = [
    {
      id: '1',
      label: 'INFORMATIONS',
      step: 'info',
    },
    {
      id: '2',
      label: <span>{`ORDER HISTORY (${orders.length})`}</span>,
      step: 'orders',
    },
    {
      id: '3',
      label: <span>{`WISHLIST (${favorites.length})`}</span>,
      step: 'wish',
    },
  ];

  const displaySection = {
    info: <Informations />,
    orders: <History orders={orders} />,
    wish: <Wishlist favorites={favorites} />,
  };

  return (
    <Page>
      <section className={dashboard}>
        <aside className={asideSection}>
          <ul className={asideItems}>
            {sideMenuList.map((item) => (
              <li onClick={() => setMenu(item.step)}>{item.label}</li>
            ))}
          </ul>
        </aside>
        <main className={mainSection}>{displaySection[menu]}</main>
      </section>
      <Footer />
    </Page>
  );
}
export default Dashboard;
