import React from 'react'
import { Helmet } from 'react-helmet'

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>Ycommerce: {title}</title>
      <meta name='description' content={description} />
      <meta name='keyword' content={keywords} />
    </Helmet>
  )
}

Meta.defaultProps = {
  title: 'Siêu thị đồ điện tử',
  description: 'Đồ điện tử chất lượng cao với giá rẻ nhất',
  keywords: 'đồ điện tử, electronics, cheap electroincs',
}

export default Meta