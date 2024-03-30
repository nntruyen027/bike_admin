const locations = [
  {
    'name': 'Tất cả',
    'wards': [
      {
        'name': 'Tất cả',
      },
    ],
  },
  {
    'name': 'Ninh Kiều',
    'wards': [
      {
        'name': 'Tất cả',
      },
      {
        'name': 'An Bình',
      },
      {
        'name': 'An Cư',
      },
      {
        'name': 'An Hoà',
      },
      {
        'name': 'An Khánh',
      },
      {
        'name': 'An Nghiệp',
      },
      {
        'name': 'An Phú',
      },
      {
        'name': 'Cái Khế',
      },
      {
        'name': 'Hưng Lợi',
      },
      {
        'name': 'Tân An',
      },
      {
        'name': 'Thới Bình',
      },
      {
        'name': 'Xuân Khánh',
      },
    ],
  },
  {
    'name': 'Bình Thuỷ',
    'wards': [
      {
        'name': 'Tất cả',
      },
      {
        'name': 'An Thới',
      },
      {
        'name': 'Bình Tuỷ',
      },
      {
        'name': 'Bùi Hữu Nghĩa',
      },
      {
        'name': 'Long Hoà',
      },
      {
        'name': 'Long Tuyền',
      },
      {
        'name': 'Thới An Đông',
      },
      {
        'name': 'Trà An',
      },
      {
        'name': 'Trà Nóc',
      },
    ],
  },
  {
    'name': 'Thốt Nốt',
    'wards': [
      {
        'name': 'Tất cả',
      },
      {
        'name': 'Tân Hưng',
      },
      {
        'name': 'Tân Lộc',
      },
      {
        'name': 'Thạnh Hoà',
      },
      {
        'name': 'Thốt Nốt',
      },
      {
        'name': 'Thới Thuận',
      },
      {
        'name': 'Thuận An',
      },
      {
        'name': 'Thuận Hưng',
      },
      {
        'name': 'Trung Kiên',
      },
      {
        'name': 'Trung Nhứt',
      },
    ],
  },
  {
    'name': 'Cái Răng',
    'wards': [
      {
        'name': 'Tất cả',
      },
      {
        'name': 'Ba Láng',
      },
      {
        'name': 'Hưng Phú',
      },
      {
        'name': 'Hưng Thạnh',
      },
      {
        'name': 'Lê Bình',
      },
      {
        'name': 'Phú Thứ',
      },
      {
        'name': 'Tân Phú',
      },
      {
        'name': 'Thường Thạnh',
      },
    ],
  },
  {
    'name': 'Ô Môn',
    'wards': [
      {
        'name': 'Tất cả',
      },
      {
        'name': 'Châu Văn Liêm',
      },
      {
        'name': 'Long Hưng',
      },
      {
        'name': 'Phước Thới',
      },
      {
        'name': 'Thới An',
      },
      {
        'name': 'Thới Hoà',
      },
      {
        'name': 'Thới Long',
      },
      {
        'name': 'Trường Lạc',
      },
    ],
  },
  {
    'name': 'Cờ Đỏ',
    'wards': [
      {
        'name': 'Tất cả',
      },
      {
        'name': 'Cờ Đỏ',
      },
      {
        'name': 'Đông Hiệp',
      },
      {
        'name': 'Đông Thắng',
      },
      {
        'name': 'Thạnh Phú',
      },
      {
        'name': 'Thới Đồng',
      },
      {
        'name': 'Thới Hưng',
      },
      {
        'name': 'Thới Xuân',
      },
      {
        'name': 'Trung An',
      },
      {
        'name': 'Trung Hưng',
      },
      {
        'name': 'Trung Thạnh',
      },
    ],
  },
  {
    'name': 'Phong Điền',
    'wards': [
      {
        'name': 'Tất cả',
      },
      {
        'name': 'Phong Điền',
      },
      {
        'name': 'Giai Xuân',
      },
      {
        'name': 'Mỹ Khánh',
      },
      {
        'name': 'Nhơn Ái',
      },
      {
        'name': 'Nhơn Nghĩa',
      },
      {
        'name': 'Tân Thới',
      },
      {
        'name': 'Trường Long',
      },
    ],
  },
  {
    'name': 'Thới Lai',
    'wards': [
      {
        'name': 'Tất cả',
      },
      {
        'name': 'Thới Lai',
      },
      {
        'name': 'Định Môn',
      },
      {
        'name': 'Đông Bình',
      },
      {
        'name': 'Đông Thuận',
      },
      {
        'name': 'Thân Thạnh',
      },
      {
        'name': 'Thới Tân',
      },
      {
        'name': 'Thới Thạnh',
      },
      {
        'name': 'Trường Thắng',
      },
      {
        'name': 'Trường Thành',
      },
      {
        'name': 'Trường Xuân',
      },
      {
        'name': 'Trường Xuân A',
      },
      {
        'name': 'Trường Xuân B',
      },
      {
        'name': 'Xuân Thắng',
      },
    ],
  },
  {
    'name': 'Vĩnh Thạnh',
    'wards': [
      {
        'name': 'Tất cả',
      },
      {
        'name': 'Vĩnh Thạnh',
      },
      {
        'name': 'Thạnh An',
      },
      {
        'name': 'Thạnh An',
      },
      {
        'name': 'Thạnh Lộc',
      },
      {
        'name': 'Thạnh Lợi',
      },
      {
        'name': 'Thạnh Mỹ',
      },
      {
        'name': 'Thạnh Quới',
      },
      {
        'name': 'Thạnh Thắng',
      },
      {
        'name': 'Thạnh Tiến',
      },
      {
        'name': 'Vĩnh Bình',
      },
      {
        'name': 'Vĩnh Trinh',
      },
    ],
  },
];

export default locations;
