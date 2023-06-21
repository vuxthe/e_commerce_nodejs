import {
    DollarCircleOutlined,
    ShoppingCartOutlined,
    ShoppingOutlined,
    UserOutlined,
  } from "@ant-design/icons";
  import { Card, Space, Statistic, Table, Typography } from "antd";
  import { useEffect, useState } from "react";
  import { useDispatch, useSelector } from 'react-redux'
  import { useNavigate } from 'react-router-dom'
  import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from "chart.js";
  import { Bar, Doughnut } from "react-chartjs-2";
  import { listAllOrders } from "../actions/orderActions";
  import { listProducts } from "../actions/productActions";
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  function Dashboard() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const orderList = useSelector((state) => state.orderList)
    const productList = useSelector((state) => state.productList)
    const { loading, error, orders } = orderList
    const { products } = productList
    const { userInfo } = useSelector((state) => state.userLogin)
    const { success: deleteSuccess } = useSelector((state) => state.orderDelete)

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
          dispatch(listAllOrders())
          dispatch(listProducts())
        } else {
          navigate('/login')
        }
      }, [dispatch, userInfo, navigate, deleteSuccess])

    return (
      <Space size={20} direction="vertical">
        <Typography.Title level={4}>Thống kê doanh thu</Typography.Title>
        <Space direction="horizontal">
          <DashboardCard
            icon={
              <ShoppingCartOutlined
                style={{
                  color: "green",
                  backgroundColor: "rgba(0,255,0,0.25)",
                  borderRadius: 20,
                  fontSize: 24,
                  padding: 8,
                }}
              />
            }
            title={"Đơn hàng"}
            value={orders.length}
          />
          <DashboardCard
            icon={
              <ShoppingOutlined
                style={{
                  color: "blue",
                  backgroundColor: "rgba(0,0,255,0.25)",
                  borderRadius: 20,
                  fontSize: 24,
                  padding: 8,
                }}
              />
            }
            title={"Sản phẩm đã bán"}
            value={orders.reduce((acc, order) => {
                return acc + order.orderItems.reduce((acc, item) => {
                    return acc + item.qty;
                }, 0);
            }, 0)}
          />
          <DashboardCard
            icon={
              <UserOutlined
                style={{
                  color: "purple",
                  backgroundColor: "rgba(0,255,255,0.25)",
                  borderRadius: 20,
                  fontSize: 24,
                  padding: 8,
                }}
              />
            }
            title={"Khách hàng"}
            value={
                [...new Set(orders.map((order) => order.user._id))].length
            }
          />
          <DashboardCard
            icon={
              <DollarCircleOutlined
                style={{
                  color: "red",
                  backgroundColor: "rgba(255,0,0,0.25)",
                  borderRadius: 20,
                  fontSize: 24,
                  padding: 8,
                }}
              />
            }
            title={"Doanh thu"}
            value={orders.reduce((acc, order) => {
                return acc + order.totalPrice;
              }, 0)}
          />
        </Space>
        <Space>
          <DashboardChart />
        </Space>
      </Space>
    );
  }

  function DashboardCard({ title, value, icon }) {
    return (
      <Card>
        <Space direction="horizontal">
          {icon}
          <Statistic title={title} value={value} />
        </Space>
      </Card>
    );
  }


  function DashboardChart() {
    const dispatch = useDispatch()
    const orderList = useSelector((state) => state.orderList)
    const productList = useSelector((state) => state.productList)
    const { loading, error, orders } = orderList
    const { products } = productList

    // Thống kê doanh thu theo khách hàng
    const revenueByCustomer = orders.reduce((acc, order) => {
        const customerName = order.user.name;
        const totalPrice = order.totalPrice;

        if (acc[customerName]) {
          acc[customerName] += totalPrice;
        } else {
          acc[customerName] = totalPrice;
        }
        return acc;
      }, {});
    const labels = Object.keys(revenueByCustomer);
    const data = Object.values(revenueByCustomer);
    const revenueData = {
        labels: labels,
        datasets: [
            {
            label: "Doanh thu",
            data: data,
            backgroundColor: "rgba(255, 0, 0, 1)",
            },
        ]
    }

    // Thống kê doanh thu theo ngày
    const revenueByDate = orders.reduce((acc, order) => {
        const createdAt = order.createdAt.split('T')[0];
        const totalPrice = order.totalPrice;
        if (acc[createdAt]) {
          acc[createdAt] += totalPrice;
        } else {
          acc[createdAt] = totalPrice;
        }
        return acc;
      }, {});
      const revenueDate = {
        labels: Object.keys(revenueByDate),
        datasets: [
            {
            label: "Doanh thu",
            data: Object.values(revenueByDate),
            backgroundColor: "rgba(255, 0, 0, 1)",
            },
        ]
    }

    // Thống kê doanh thu theo category
    // Tạo một đối tượng để lưu trữ doanh thu theo từng category
    const revenueByCategory = {};
    // Lặp qua mỗi đơn hàng trong mảng orders
    orders.forEach((order) => {
    // Lặp qua từng sản phẩm trong đơn hàng
    order.orderItems.forEach((orderItem) => {
        const { product } = orderItem;
        const foundProduct = products.find((p) => p._id === product);
        if (foundProduct) {
        let { category, price, brand } = foundProduct;
        console.log(foundProduct);
        // Kiểm tra nếu category chưa tồn tại trong đối tượng revenueByCategory
            if (!revenueByCategory[brand]) {
                revenueByCategory[brand] = 0;
            }
            // Cộng thêm giá của sản phẩm vào tổng doanh thu của category tương ứng
            revenueByCategory[brand] += price * orderItem.qty;
        }
    });
    });
    const revenueByCategoryData = {
        labels: Object.keys(revenueByCategory),
        datasets: [
          {
            label: 'Doanh thu',
            data: Object.values(revenueByCategory), // Giá trị doanh thu
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#33FF9E'],
            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#33FF9E'],
          }
        ]
    }


    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: "bottom",
        },
        title: {
          display: true,
          text: "Thống kê doanh thu",
        },
      },
    };

    return (
        <div>
        <Card style={{ width: 500, height: 250 }}>
            <Bar options={options} data={revenueData} />
        </Card>
        <Card style={{ width: 500, height: 250 }}>
        <Bar options={options} data={revenueDate} />
        </Card>
        <Card style={{ width: 500, height: 250 }}>
            <Bar options={options} data={revenueByCategoryData} />
        </Card>
        </div>


    );
  }
  export default Dashboard;
