import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import jwt from 'jwt-decode';

import Page from '../../../components/components/container';
import Footer from '../../components/footer';
import Informations from './menu/informations/Informations';
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
  const [menu, setMenu] = useState('info');

  const favorite = useSelector((state) => state?.basket);
  const order = useSelector((state) => state?.user?.user?.orders);
  const details = useSelector((state) => state?.user?.user?.details);
  const profile = useSelector((state) => state?.tokens?.tokens?.token);

  const { id } = jwt(profile);

  useEffect(() => {
    dispatch(getUserDetails(id));
  }, [dispatch, profile, id]);

  const sideMenuList = [
    {
      id: '1',
      label: 'INFORMATIONS',
      step: 'info',
      ariaLabel: 'click to go to the user details page',
    },
    {
      id: '2',
      label: <span>{`ORDER HISTORY (${order?.orders?.length})`}</span>,
      step: 'orders',
      ariaLabel: 'click to go to the order history page',
    },
    {
      id: '3',
      label: <span>{`WISHLIST (${favorite?.favorites?.length})`}</span>,
      step: 'wish',
      ariaLabel: 'click to go to the wishlist page',
    },
  ];

  const displaySection = {
    info: <Informations details={details} userId={id} />,
    orders: <History orders={order?.orders} />,
    wish: <Wishlist favorites={favorite?.favorites} />,
  };

  return (
    <Page>
      <section className={dashboard}>
        <aside className={asideSection}>
          <section className={asideItems}>
            {sideMenuList.map((item, i) => (
              <button
                key={i}
                tabIndex={0}
                type="button"
                aria-label={item.ariaLabel}
                onClick={() => setMenu(item.step)}>
                {item.label}
              </button>
            ))}
          </section>
        </aside>
        <main className={mainSection}>{displaySection[menu]}</main>
      </section>
      <Footer />
    </Page>
  );
}
export default Dashboard;
