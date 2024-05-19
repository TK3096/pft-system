'use client'

import { TaskBoard, TaskGroup, Task } from '@/types'

import React, { useState, useEffect } from 'react'
import dayjs from 'dayjs'

import { Button } from '@/components/ui/button'

import { getDocuments } from '@/lib/firebase/db'

const PlaygroundPage = () => {
  //   const [workspaces, setWorksapces] = useState([])
  //   const [boards, setBoards] = useState([])
  const [tasks, setTasks] = useState([
    {
      createdAt: 1712287816,
      name: '[MEMBER/WALLET] เพิ่ม check phonenumber ต้องไม่ซ้ำกับ member คนอื่น',
      description:
        '- ตอน request OTP เพิ่มให้ check กับตาราง member ของ member service ต้องไม่ซ้ำกับของคนอื่น (verified_phonenumber)',
      remarks: ['https://shippop.atlassian.net/browse/SP-7182'],
      state: 'done',
      status: 'active',
      updatedAt: 1712287816,
      boardId: 'qXcks9DaFgf0SRZ9BcxZ',
      owner: 'YYNJX159OkPVFUgmdAfMztAt4h53',
    },
    {
      description:
        '- ไม่สามารถอ่านไฟล์ google map ได้ (403 forbiden) แต่อีก link ที่เป็นของ thaipost inter สามารถอ่านได้ปกติ เป็นแค่ของ popshop\n- แก้โดย เอาค่า json ที่ได้ไป replace ทับ วิธีเก่าที่อ่านจากไฟล์จาก server แทน',
      state: 'done',
      remarks: [
        'hotfix/SP-7234-popshop-stattion-not-found',
        'https://shippop.atlassian.net/browse/SP-7234',
      ],
      name: '[SHIPPOP/DROPOFF_STATION] จุด dropoff popshop ที่หน้า homepage ไม่แสดง',
      status: 'active',
      updatedAt: 1714702357,
      createdAt: 1714621892,
      owner: 'YYNJX159OkPVFUgmdAfMztAt4h53',
      boardId: 'lvkKKxfFnxaLKwF0rAfH',
    },
    {
      boardId: 'qXcks9DaFgf0SRZ9BcxZ',
      name: '[SHIPPOP/API] เพิ่มรับนามสกุลไฟล์ pdf ของ api mkp service',
      createdAt: 1711434561,
      updatedAt: 1712287678,
      description:
        '- เพิ่มให้ API verify account (createMember & createBankAccount) รองรับการไฟล์ (maximum size : 5 MB)\n- https://mkpservice.shippop.dev/bank/create/\n- https://mkpservice.shippop.dev/identity/create/',
      state: 'done',
      status: 'active',
      owner: 'YYNJX159OkPVFUgmdAfMztAt4h53',
      remarks: [
        'feature/SP-7112-api-member-pdf-easy-order',
        'https://shippop.atlassian.net/browse/SP-7112',
      ],
    },
    {
      updatedAt: 1711531884,
      remarks: [
        'feature/SP-7131',
        'https://shippop.atlassian.net/browse/SP-7171',
      ],
      name: '[SHIPPOP/ADMIN] ช่วยแก้ code react ของ report wallet',
      boardId: 'qXcks9DaFgf0SRZ9BcxZ',
      description:
        '- แก้ให้ gen report file ได้ โดยใช้ value จาก form element แทน query params\n- แก้ให้ download file จาก s3 ได้ (ได้ response กลับมาเป็น download url ของ s3 อยุ่แล้ว แค่สั่งให้เปิด link นั้น)\n- แก้ให้แต่ละหน้าใช้ useContext ของตัวเอง',
      status: 'active',
      state: 'review',
      owner: 'YYNJX159OkPVFUgmdAfMztAt4h53',
      createdAt: 1711531884,
    },
    {
      name: '[SHIPPOP/DOC] PDF แสดงไม่ถูกต้อง (spaceing)',
      state: 'done',
      owner: 'YYNJX159OkPVFUgmdAfMztAt4h53',
      createdAt: 1714709614,
      description:
        '- ตัวหนังสือทับกับ เส้น divider\n- แก้ไขให้ตัวอักษรไม่ทับ และ ไม่กระทบกับ position ของ esign\n- ย้าย header ไปอยู่ ใน table elemnt (colspan 99)\n- ปรับค่าแกน y ของ textfield ที่ใช้แสดงสำหรับ esign',
      status: 'active',
      updatedAt: 1714719295,
      boardId: 'lvkKKxfFnxaLKwF0rAfH',
      remarks: [
        'https://shippop.atlassian.net/browse/SP-7241',
        'hotfix/SP-7241-template-pdf-wrong-display',
      ],
    },
    {
      createdAt: 1712719058,
      status: 'active',
      state: 'done',
      name: '[POP/WALLET] เพิ่มหน้าแสดงใบเสร็จของ wallet',
      remarks: [
        'https://shippop.atlassian.net/browse/SP-7199',
        'feature/SP-7199-pop-wallet-edit-invoice-receipt-page-to-support',
      ],
      updatedAt: 1714104087,
      boardId: 'l4BXngaE8DWVkutXGFeq',
      owner: 'YYNJX159OkPVFUgmdAfMztAt4h53',
      description:
        '- เพิ่มหน้าสำหรับ receipt ของ wallet ที่ implement wallet v2\n- logic ข้างไหนเหมือนหน้า /report/invoice',
    },
    {
      boardId: 'tpfvMQcWEWUsX8lEuqa0',
      owner: 'YYNJX159OkPVFUgmdAfMztAt4h53',
      status: 'active',
      name: '[POPSHOP/POS] ไม่สามารถรายการด้วยตำบล วังหงส์',
      state: 'review',
      updatedAt: 1715142344,
      createdAt: 1715142344,
      remarks: [
        'https://shippop.atlassian.net/browse/SP-7268',
        'hotfix/SP-7268-wrong-district-wanghong',
      ],
      description:
        '- ตอนสร้างรายการของ Flash จะมี call chcek price กับ flash (https://open-api-tra.flashexpress.com/open/v1/orders/estimate_rate) ซึ่ง flash มองว่า วังหงส์ ต้องใช้คำว่า วังหงษ์\n- แก้โดย replace วังหงส์ เป็น วังหงษ์ ทั้ง front-end และ back-end',
    },
    {
      description:
        'เมื่อเลยระยะเวลาที่กำหนด 10 เมษายน 2567\n- แสดง modal ไม่สามารถสร้างรายการได้ในหน้า POS ตั้งแต่ตอนเข้าเมนู\n- ใช้ modal เดิมกับตอน verify wallet แต่เปลี่ยน text\n- ปิดไม่ได้\n\n** modal เก่าจะไม่มีแสดงแล้ว จะเหลือแค่หน้า POS อย่างเดียว',
      owner: 'YYNJX159OkPVFUgmdAfMztAt4h53',
      updatedAt: 1713510121,
      status: 'active',
      state: 'done',
      boardId: 'l4BXngaE8DWVkutXGFeq',
      name: '[POP/WALLET] modal แจ้งเตือน lock การใช้งานถ้ายังไม่ได้ verify wallet',
      remarks: [
        'feature/SP-7186--pop-wallet-show-modal-lock-verification-late-whe',
        'https://shippop.atlassian.net/browse/SP-7186',
      ],
      createdAt: 1712544814,
    },
    {
      updatedAt: 1710675985,
      remarks: [
        'https://shippop.atlassian.net/browse/SP-7034',
        'https://gitlab.com/shippopth/SHIPPOP/-/merge_requests/14573',
        'https://gitlab.com/shippopth/shippop-member/-/merge_requests/129',
      ],
      state: 'done',
      description:
        'เพิ่ม api 6 เส้นที่ member- post verification สร้าง token สำหรับส่งเมลและส่งเมล- post verification/email (bff) verify email ตอนกด link จาก email- post verification/otp/verify ยิงไปเพื่อใช้ code otp ของ shippop สำหรับ generate และส่ง otp- post verification/otp/validate ยิงไปเพื่อใช้ code otp ของ shippop สำหรับ validate otp- post verification/set_consent set consent 0 -> 1 ที่ member service- post verification/destroy_email destroy token เมื่อ submit form ที่ member service success',
      status: 'active',
      owner: 'YYNJX159OkPVFUgmdAfMztAt4h53',
      boardId: 'gHnYyMyyUMzpmCtw8CJF',
      name: '[MEMBER/WALLET] การ verify ตัวตันของ wallet',
      createdAt: 1710675985,
    },
    {
      remarks: [
        'https://shippop.atlassian.net/browse/SP-7055',
        'https://gitlab.com/shippopth/SHIPPOP/-/merge_requests/14563',
      ],
      status: 'active',
      createdAt: 1710676086,
      description: 'แมพ key ของ object ผิด- แก้จาก bank-data เป็น bank_data',
      name: '[MARKET_DOCUMENT] ข้อมูล bank account ที่สถานะเป็น confirmed ไม่แสดงที่หน้า admin',
      owner: 'YYNJX159OkPVFUgmdAfMztAt4h53',
      updatedAt: 1710676086,
      boardId: 'gHnYyMyyUMzpmCtw8CJF',
      state: 'done',
    },
    {
      createdAt: 1710676269,
      status: 'active',
      updatedAt: 1710676269,
      state: 'done',
      description:
        'option ที่แสดงตัวเลือกธนาคารมี id ซ้ำกัน เลยทำให้ไม่แสดง text (แก้ทั้ง frontend และ backend)',
      owner: 'YYNJX159OkPVFUgmdAfMztAt4h53',
      name: '[POP] แก้เลือกธนาคารแล้วไม่แสดง label',
      boardId: 'gHnYyMyyUMzpmCtw8CJF',
      remarks: [
        'https://y5unqemzhk.larksuite.com/docx/DFKKdtGCIojQABx25quueIuCsey',
        'https://gitlab.com/shippopth/pop-shippop/pop-shippop-frontend/-/merge_requests/851',
        'https://gitlab.com/shippopth/pop-shippop/shopx-backend/-/merge_requests/1005',
      ],
    },
    {
      owner: 'YYNJX159OkPVFUgmdAfMztAt4h53',
      remarks: [
        'feature/SP-7070-topup-wallet_v-2-admin-show-wallet-information-o',
        'https://shippop.atlassian.net/browse/SP-7070',
        'https://gitlab.com/shippopth/SHIPPOP/-/merge_requests/14610',
        'https://gitlab.com/shippopth/SHIPPOP/-/merge_requests/14611',
      ],
      state: 'done',
      createdAt: 1710675487,
      status: 'active',
      boardId: '3CW9qQCAXyxD7BfLTpRg',
      updatedAt: 1710675487,
      description: 'เพื่มการแสดงค่าจาก colum inv_id ของ table order',
      name: '[SHIPPOP/TOPUP_WALLET] แสดง inv_id ที่หน้า admin tracking',
    },
    {
      state: 'done',
      status: 'active',
      boardId: 'qXcks9DaFgf0SRZ9BcxZ',
      name: '[SHIPPOP/WALLET] การสร้างรายการที่มีประกันด้วย wallet',
      owner: 'YYNJX159OkPVFUgmdAfMztAt4h53',
      remarks: [
        'feature/SP-7163-walletv2-shippop-stamp-order-insurance-method-wa',
        'https://shippop.atlassian.net/browse/SP-7163',
      ],
      updatedAt: 1712287690,
      description:
        '- เก็บข้อมูล order ที่ตัดค่าประกันผ่าน wallet ของ SHIPPOP (เหมือนตอนทำ booking ของ order)\n- save invoice_no = WALLET ใน ตาราง order_insurance\n- api เส้นที่แก้ mkpservice.shippop.com/booking/\n- แนบ params นี้เพื่อเข้า flow ประกัน"insurance_code": "DHPY", "declared_value": "64000.00",',
      createdAt: 1711510388,
    },
    {
      status: 'active',
      state: 'done',
      remarks: [
        'https://shippop.atlassian.net/browse/SP-7125',
        'feature/SP-7125-topup-wallet_v-2-member-register-new-member-when',
        'มี merge request แค่ฝั่ง popshop frontend',
      ],
      name: '[POPSHOP/VERIFICATION_WALLET] เพิ่มให้ส่ง name ของ shop owner ไปตอน verification',
      updatedAt: 1712284938,
      boardId: 'YRlR5TbYKPooAV1QzYNd',
      createdAt: 1711106050,
      description:
        'เพิ่มให้ส่ง name ของ shop owner ไปตอน verification จะได้ตัดปัญญาขึ้น error ว่า member not found (เบื้องหลังจะไปสร้าง account ที่ member service ให้)',
      owner: 'YYNJX159OkPVFUgmdAfMztAt4h53',
    },
    {
      status: 'active',
      owner: 'YYNJX159OkPVFUgmdAfMztAt4h53',
      state: 'done',
      updatedAt: 1711105292,
      boardId: 'YRlR5TbYKPooAV1QzYNd',
      name: '[SHIPPOP/PRICE_REVISE] API สร้างรายการของ price revise',
      remarks: [
        'https://shippop.atlassian.net/browse/SP-7126',
        'feature/SP-7126-weight_revise-api-for-request-and-upload-image',
      ],
      description:
        'สร้าง api สำหรับรองรับการสร้าง price revise\n- รูปเก็บที่ s3 (/price_revise) แล้วเอา path มารูปมาเก็บลง db\n- ข้อมูล insert ลง order_price_revise',
      createdAt: 1711105292,
    },
    {
      owner: 'YYNJX159OkPVFUgmdAfMztAt4h53',
      state: 'done',
      updatedAt: 1710676145,
      boardId: 'gHnYyMyyUMzpmCtw8CJF',
      status: 'active',
      createdAt: 1710676145,
      remarks: [
        'https://gitlab.com/shippopth/pop-shippop/shopx-backend/-/merge_requests/1005',
      ],
      description:
        'สร้าง draft order แล้ว update ไม่ได้** มี case ที่สร้างแล้ว ที่อยู่ suggess ให้ผิด (ที่อยู่เบิ้ล)',
      name: '[B2B] สร้าง draft order แล้ว update ไม่ได้',
    },
    {
      boardId: 'gHnYyMyyUMzpmCtw8CJF',
      name: '[POP/WALLET] check ว่า verify identity wallet กับ member service + callback page หลังจาก verify สำเร็จ',
      description:
        '- modal แจ้งเตือนให้ไปยืนยันตัวตนกับ member service- หน้าสำหรับรับ callback จาก member serivce ตอนยืนยันตัวตนสำเร็จ',
      createdAt: 1710676208,
      updatedAt: 1710676208,
      status: 'active',
      owner: 'YYNJX159OkPVFUgmdAfMztAt4h53',
      state: 'done',
      remarks: [
        'https://shippop.atlassian.net/browse/SP-7035',
        'https://shippop.atlassian.net/browse/SP-7036',
      ],
    },
    {
      updatedAt: 1714709528,
      remarks: [
        'feature/SP-7244-stamp-checked-order',
        'https://shippop.atlassian.net/browse/SP-7244',
      ],
      description:
        '- เอาข้อมูลจาก excel ที่ได้จากตอน checking มา update table m_sum ของ bi (พวก prefix ที่เป็น ex_)\n- เอาทุก tab ยกเว้น summary, duplicated, billed และ not_found ที่ไม่ต้องเอาไป update',
      owner: 'YYNJX159OkPVFUgmdAfMztAt4h53',
      createdAt: 1714462307,
      boardId: 'lvkKKxfFnxaLKwF0rAfH',
      status: 'active',
      state: 'review',
      name: '[BI/CHECK_BILL] stamp รายการที่ check แล้วของ check-bill',
    },
    {
      boardId: 'U8ZHASyHYpOl5Ie1SVLB',
      remarks: [],
      updatedAt: 1711465356,
      createdAt: 1711429941,
      state: 'done',
      description:
        '- ย้าย data จากเดิมที่ตั้งใจเพื่อจะไว้ทำเป็น static page กลับไปไว้ที่ firestore เหมือนเดิม เพราะท้ายที่สุด ถ้ามี search มันก็เป็น client side อยู่ดี ทำให้การทำ static page แล้ว revalidate ดูไม่จำเป็น',
      owner: 'YYNJX159OkPVFUgmdAfMztAt4h53',
      status: 'active',
      name: '[PORTFOLIO] ย้ายข้อมูลไปบน firestore เหมือนเดิม',
    },
    {
      name: '[SHIPPOP/PARTIAL_PAYMENT] ปรับการแสดงผลไฟล์ excel receivable',
      updatedAt: 1715585745,
      boardId: 'tpfvMQcWEWUsX8lEuqa0',
      description:
        '- หน้าสำหรับ export file https://www1.mhooeng.com/admin/accounting/receivable/\n- เพิ่ม column ชำระเงินแล้วกับยอดคงเหลือ\n- ไม่ต้องแสดง row ที่เป็น child ของ partial แสดงเฉพาะ parent\n- column ดอกเบี้ย% เดิมคำนวณจาก column M (จำนวนเงิน) เปลี่ยนมาใช้ column O (ยอดคงเหลือ) ที่เพิ่มใหม่',
      state: 'review',
      status: 'active',
      owner: 'YYNJX159OkPVFUgmdAfMztAt4h53',
      remarks: [
        'feature/SP-7278-support-partial-payment',
        'https://shippop.atlassian.net/browse/SP-7278',
      ],
      createdAt: 1715228829,
    },
    {
      remarks: [
        'hotfix/SP-7159-weight_revise-issue-upload-multiple-image-exceed',
        'https://shippop.atlassian.net/browse/SP-7159',
      ],
      createdAt: 1711681507,
      owner: 'YYNJX159OkPVFUgmdAfMztAt4h53',
      boardId: 'qXcks9DaFgf0SRZ9BcxZ',
      status: 'active',
      name: '[SHIPPOP/WEIGHT_REVISE] แก้ upload file แล้วติด limit size',
      description:
        '- ฝั่ง backend รับ images เป็น arry ของ base64 แต่ frontend ส่งมาแค่ element เดียว (index ที่ 0) โดยที่ค่าข้างในคือ base64 ที่ต่อกันด้วย "," (data:image/png;base64,xxxx,data:image/png:base64;yyyy)\n- แก้โดยเปลี่ยนจาก join ด้วย "," เป็น "&" แล้วก่อน call api ก็มา loop ปั้น images ที่เป็น array โดยที่แต่ละ index เป็น base64 ตัวเดียว\n- เพื่มให้ frontend import pdf ได้',
      state: 'review',
      updatedAt: 1711706159,
    },
    {
      name: '[SHIPPOP/FLEDS] update status ของ order เก่า',
      updatedAt: 1710675812,
      boardId: '3CW9qQCAXyxD7BfLTpRg',
      remarks: [
        'hotfix/SP-7046-fleds-shippop-update-status-flash-dropoff-script',
        'https://shippop.atlassian.net/browse/SP-7046',
        'https://gitlab.com/shippopth/SHIPPOP/-/merge_requests/14606',
      ],
      owner: 'YYNJX159OkPVFUgmdAfMztAt4h53',
      createdAt: 1710675812,
      state: 'done',
      status: 'active',
      description:
        'script สำหรับ update status ของ fleds ที่เป็น order เก่า ตั้งแต่วันที่ 3 กุมภาพันธ์ 2024 ลงไปquery จาก mongo แล้วเอาไปเรียก callback ของ fleds ทีละรายการ',
    },
    {
      status: 'active',
      boardId: 'qXcks9DaFgf0SRZ9BcxZ',
      owner: 'YYNJX159OkPVFUgmdAfMztAt4h53',
      remarks: ['https://shippop.atlassian.net/browse/SP-7181'],
      description:
        '- ของเดิมแยกเป็น 6 ช่อง แล้วพอเปิดบน mobile มันแสดงแปลกๆ\n- แก้เป็นเหลือช่องเดียว แล้ว set max-length เป็น 6',
      updatedAt: 1712287728,
      state: 'done',
      createdAt: 1712287667,
      name: '[MEMBER/WALLET] แก้ input phone OTP ให้เหลือช่องเดียว',
    },
    {
      status: 'active',
      name: '[MEMBER/VERIFICATION_WALLET] แก้ input phone ให้ hide error เมื่อมีการแก้ไข input',
      updatedAt: 1714985255,
      remarks: [
        'hotfix/SP-7269-hide-error-after-input-change',
        'https://shippop.atlassian.net/browse/SP-7269',
      ],
      owner: 'YYNJX159OkPVFUgmdAfMztAt4h53',
      state: 'review',
      boardId: 'tpfvMQcWEWUsX8lEuqa0',
      createdAt: 1714985012,
      description:
        'เรื่อง UI\n- input phone ถ้ากรอกผิด validate แล้วกด request otp จะแสดง error text แต่เมื่อมี change error text ไม่ได้หายไป แต่ flow ยังทำงานปกติ\n- ปรับ logic ui ให้ check ว่า value ตอน error (fieldState.error.ref.value) กับ value ตอน input (field.value) ต้องตรงกันถึงจะแสดง error text\n\nเรื่อง Flow การ verify\n- เข้า flow verify ที่ member แต่พอ submit แล้ว redirect กลับมาที่ popshop ขึ้น login เพราะไม่มี token (อันนี้ปกติ) แต่พอ login เสร็จ ไม่กลับไปหน้าสำหรับรับ callback จาก member โดยที่ฝั่ง member มีการเก็บข้อมูลลง db ถุกต้อง แต่ฝั่ง popshop ไม่ได้บันทึกว่า verified แล้ว\n- จากที่ investigate จาก video ที่แนบมา เป็นไปได้ว่า account ที่ใช้ login หลังจากที่ submit form ที่ member จะเป็น account ที่เป็น role member ซึ่งหน้า callback ล็อคไว้ว่าต้องเป็น role admin ถึงจะเข้าได้',
    },
    {
      remarks: [
        'hotfix/SP-7177-member-move-sendsms-function-to-use-sendsms-on-t',
        'https://shippop.atlassian.net/browse/SP-7177',
        'parent branch คือ feature/SP-7118-topup-wallet_v-2-member-verify-otp-unique-on-mem',
      ],
      description:
        '- เปลี่ยน provider ที่ใช้ส่ง sms จาก wavecell มาเป็น true (โดยต้อง call ไปหา shippop เพื่อให้ shippop ไปเรียก true แทน)\n- แก้พวก code เก่าที่เป็น wavecell ให้มาใช้ของใหม่แทน',
      name: '[MEMBER/SMS] เปลี่ยน sms provider จาก wavecell มาเป็น true',
      owner: 'YYNJX159OkPVFUgmdAfMztAt4h53',
      createdAt: 1711940349,
      boardId: 'qXcks9DaFgf0SRZ9BcxZ',
      state: 'review',
      status: 'active',
      updatedAt: 1711945176,
    },
    {
      remarks: [
        'https://shippop.atlassian.net/browse/SP-7161',
        'hotfix/SP-7159-weight_revise-issue-upload-multiple-image-exceed',
        'https://business.mhooeng.com/order/price_revise/',
      ],
      name: '[SHIPPOP/WEIGHT_REVISE] แก้การแสดงสถานะของ order revise',
      status: 'active',
      boardId: 'qXcks9DaFgf0SRZ9BcxZ',
      description:
        '- แก้การแสดงสถานะของ order revise (แก้คำที่ระบบ lang)\n- แก้ pagination (frontend)\n- แก้ text สำหรับ filter สถานะ',
      createdAt: 1711696178,
      owner: 'YYNJX159OkPVFUgmdAfMztAt4h53',
      updatedAt: 1711706286,
      state: 'review',
    },
    {
      owner: 'YYNJX159OkPVFUgmdAfMztAt4h53',
      createdAt: 1712584795,
      description:
        'หาที่ฝาก cronjob สำหรับ run summary transactions ในเดือนก่อนหน้า\n\nstamp ข้อมูลตามนี้\n- total deposite\n- total withdraw\n- remain (2 อันบนลบกัน)',
      state: 'todo',
      remarks: [],
      status: 'active',
      name: '[LineBot/Ledger] cron job update summary ทุกวันที่ 1 ของเดือนถัดไป',
      boardId: 'C0PrX8HGxnkQqNWIP7nU',
      updatedAt: 1712584961,
    },
    {
      status: 'active',
      updatedAt: 1710676051,
      name: '[MARKET_DOCUMENT] หน้า business ขึ้นไฟล์ซ้ำ',
      createdAt: 1710676051,
      boardId: 'gHnYyMyyUMzpmCtw8CJF',
      description:
        'กด submit แล้ว พอกด submit อีกรอบ มีการ insert ไฟล์เข้า db อีกรอบเพราะ ตัว code validate value จาก input elementแก้โดยการ force refresh ทุกครั้งที่มีการ submit',
      owner: 'YYNJX159OkPVFUgmdAfMztAt4h53',
      state: 'done',
      remarks: [
        'https://shippop.atlassian.net/browse/SP-7058',
        'https://gitlab.com/shippopth/SHIPPOP/-/merge_requests/14571',
      ],
    },
    {
      owner: 'YYNJX159OkPVFUgmdAfMztAt4h53',
      updatedAt: 1712287684,
      state: 'done',
      remarks: [
        'https://shippop.atlassian.net/browse/SP-7160',
        'feature/SP-7160-my-admin-issue-admin-from-on-malaysia',
      ],
      description:
        '- แก้ให้ฝั่ง MY ใช้ feature\n   - ค้นหาคำสั่งซื้อหลายรายการ\n   - ยืนยันใบสั่งซื้อหลายรายการ\n   - ยกเลิกคำสั่งซื้อหลายรายการ\n- ซ่อนเมนูประกาศขนส่งที่หน้าแรกของ admin\n- แปลงหน่วยเงินจาก baht เป็น myr',
      createdAt: 1711439907,
      boardId: 'qXcks9DaFgf0SRZ9BcxZ',
      status: 'active',
      name: '[SHIPPOP/ADMIN] แก้ admin ของ malaysia ',
    },
    {
      remarks: [
        'https://shippop.atlassian.net/browse/SP-7048',
        'https://gitlab.com/shippopth/shippop-www/-/merge_requests/270',
      ],
      createdAt: 1710676021,
      status: 'active',
      updatedAt: 1710676021,
      state: 'done',
      owner: 'YYNJX159OkPVFUgmdAfMztAt4h53',
      description:
        'logo ของ theme valentine ที่ footer ไม่ได้ assign style เลยแสดงแปลกๆ',
      name: '[HOMEPAGE] logo valentine ที่ footer size ผิด',
      boardId: 'gHnYyMyyUMzpmCtw8CJF',
    },
    {
      owner: 'YYNJX159OkPVFUgmdAfMztAt4h53',
      createdAt: 1710675422,
      description:
        'หน้า business register มี check ว่า ถ้ามีการ stamp consent policy version ที่ตาราง member ของ member service หรือยัง ถ้ามีแล้วถึงจะแสดง section สำหรับ upload fileเงื่อนไขที่ check ว่า section upload file ควรแสดงหรือไม่ เป็นตามนี้อย่างใดอย่างหนึ่งเปิด market ใหม่ กรอกข้อมูลส่วนแรก แล้วกด submitstatus ของ market เป็นเปิดใช้งานมีการ update consent กับ member service แล้วcase นี้น่าจะเกิดจาก มีการกดยินยอม consent ที่หน้า admin ซึ่งมันจะไป update ที่ member service ด้วย ทำให้โดนเงื่อนไขตามด้านบน',
      name: '[MARKET_DOCUMENT] section upload file แสดง แม้ user จะเข้ามาครั้งแรก',
      remarks: ['https://shippop.atlassian.net/browse/SP-7054'],
      state: 'done',
      boardId: '3CW9qQCAXyxD7BfLTpRg',
      status: 'active',
      updatedAt: 1710675422,
    },
    {
      name: '[LineBot/Ledger] ปรับ structure การเก็บข้อมูลลง firestore',
      boardId: 'C0PrX8HGxnkQqNWIP7nU',
      state: 'done',
      owner: 'YYNJX159OkPVFUgmdAfMztAt4h53',
      remarks: [],
      description:
        'ชื่อ collection "ledgers"\n\n- document id ใช้เป็น line id ที่ได้จาก request\n- data เป็น ปี -> เดือน (0 = january) -> detail\n- detail จะมี transactions (array of object) ที่เก็บ input จาก user จาก line (save ลง database เมื่อ dialogflow yes intent)\n- object ของแต่ละ transaction จะเป็น { amount: number, type: "deposite" | "withdraw" }',
      createdAt: 1712584266,
      updatedAt: 1712588507,
      status: 'active',
    },
    {
      updatedAt: 1714104081,
      status: 'active',
      name: '[SHIPPOP/CUSTOM_FEE] email content ไม่แสดงค่าของ premium service',
      remarks: [
        'hotfix/SP-7218-admin-edit-content-in-email-billing-calculate',
        'https://shippop.atlassian.net/browse/SP-7218',
      ],
      owner: 'YYNJX159OkPVFUgmdAfMztAt4h53',
      description:
        'ใบแจ้งหนี้ IOT ก่อนหน้านี้มีเฉพาะค่าขนส่ง จึงไม่ได้ทำคำนวณ VAT และ หัก ณ ที่จ่ายค่าบริการ 3%\n\nเมื่อเพิ่ม premium service ที่เป็นค่าบริการ ข้อมูลที่ส่งในอีเมลจึงแสดงผิด',
      createdAt: 1713502102,
      boardId: 'l4BXngaE8DWVkutXGFeq',
      state: 'done',
    },
    {
      description:
        '- ฝั่ง shippop เวลาเอา address ไป map กับ address corrector จะเอาพวกรายละเอียดที่อยู่ส่งไปด้วย ส่วน case นี้ รายละเอียดที่อยู่ error ตรงมี B ใน “B 553/002,the grass service suites,32/45 พัทยาเหนือซอย 13” ทำให้ response error มาว่า internal error แล้ว code ฝั่ง shippop น่าจะมีดักว่าให้ check จาก postcode ด้วยอีกที- ฝั่ง popshop เวลาเอา address ไป map กับ address corrector จะส่งไปแค่ ตำบล อำเภอ จังหวัด รหัสไปรษณีย์ ทำให้ไม่เจอ error แบบ shippop',
      remarks: ['https://shippop.atlassian.net/browse/SP-7057'],
      state: 'done',
      boardId: '3CW9qQCAXyxD7BfLTpRg',
      updatedAt: 1710675694,
      status: 'active',
      owner: 'YYNJX159OkPVFUgmdAfMztAt4h53',
      createdAt: 1710675694,
      name: '[POP/FLE] ไม่เก็บ travel surcharge บางละมุง ชลบุรี 20150',
    },
    {
      status: 'active',
      name: '[TOPUP_WALLET/SHIPPOP] booking รายการที่เป็น topup wallet',
      boardId: '3CW9qQCAXyxD7BfLTpRg',
      description:
        'เพิ่ม check x-referer-channel ว่าเป็น POPSHOP + มี topup_key จึงจะ set channel เป็น topup และ inv_id เป็น WALLET ที่ตาราง order',
      owner: 'YYNJX159OkPVFUgmdAfMztAt4h53',
      remarks: [
        'feature/SP-7078-topup-wallet_v-2-shippop-save-wallet-information',
        'https://gitlab.com/shippopth/SHIPPOP/-/merge_requests/14586',
        'https://gitlab.com/shippopth/SHIPPOP/-/merge_requests/14587',
        'https://shippop.atlassian.net/browse/SP-7078',
      ],
      updatedAt: 1710675667,
      state: 'done',
      createdAt: 1710675667,
    },
    {
      name: '[Tasks Management] searching',
      updatedAt: 1711554894,
      status: 'active',
      remarks: [],
      owner: 'YYNJX159OkPVFUgmdAfMztAt4h53',
      boardId: 'U8ZHASyHYpOl5Ie1SVLB',
      description:
        'ค้นหา task\n- ใช้ command component ของ shadcn\n- หาด้วยชื่อของแต่ละประเภท (field=name)\n- (optional) หาแบบ command ของ github colpilot (ที่เป็น "/" นำหน้า)\n- ถ้าเจอให้ redirect ไปจุดนั้น\n- ถ้าเป็น task พอ redirect แล้ว ให้เปิด modal ที่แสดงข้อมูลขึ้นมา',
      state: 'done',
      createdAt: 1711363549,
    },
    {
      boardId: 'qXcks9DaFgf0SRZ9BcxZ',
      remarks: [
        'feature/SP-7183-pop-wallet-member-support-difference-browser-on',
        'https://shippop.atlassian.net/browse/SP-7183',
      ],
      owner: 'YYNJX159OkPVFUgmdAfMztAt4h53',
      updatedAt: 1712222828,
      state: 'review',
      description:
        '- ครอบ auth ที่หน้า /callback/wallet-verification \n- ถ้าไม่ได้ login จะ redirect ไปหน้า login พร้อมแนบ query params ที่ url\n- พอ login เสร็จให้ redirect กลับมาที่หน้า /callback/wallet-verification ',
      status: 'active',
      createdAt: 1712120901,
      name: '[POPSHOP/WALLET] check auth ที่หน้า confirm verify wallet',
    },
    {
      boardId: 'tpfvMQcWEWUsX8lEuqa0',
      remarks: [
        'feature/SP-7277-general-custom-fee',
        'https://shippop.atlassian.net/browse/SP-7277',
      ],
      state: 'in-progress',
      description:
        '- เป็น type ที่เอาไว้ support ค่าอื่นๆ ในนาคต จะได้ไม่ต้องมาเพิ่ม type ของ custom fee ใหม่เรื่อย\n- input ว่าจะเป็นค่าขนส่ง/ค่าบริการ แล้วบอกด้วยบว่าตอนออกใบแจ้งหนี้จะให้เป็น type อะไร (return_fee etc.)',
      owner: 'YYNJX159OkPVFUgmdAfMztAt4h53',
      status: 'active',
      createdAt: 1715227511,
      updatedAt: 1715227511,
      name: '[ADMIN/CUSTOM_FEE] เพิ่มเมนูใหม่ general_custom_fee ',
    },
    {
      owner: 'YYNJX159OkPVFUgmdAfMztAt4h53',
      remarks: [
        'https://shippop.atlassian.net/browse/SP-7192',
        'feature/SP-7200-pop-wallet-export-report-excel-file-from-wallet',
        'branch เดียวกับ SP-7200',
      ],
      boardId: 'l4BXngaE8DWVkutXGFeq',
      description:
        'หน้า POS เวลากดรับเงิน แล้วถ้า balance ไม่พอกับ total price จะขึ้น modal  ว่า balance ไม่พอ \n\nของเดิมยอดที่จะตัดมันคือ ยอดที่รวมกำกับไรหน้าร้านแล้ว และลูกค้างง(แต่ backend ตัดถูกปกติ) เลยแก้ใหม่ให้เอายอด (rate) มา sum แทน (affect เฉพาะ wallet v2 check จากตัวแปร this.main_wallet_v2)\n\nผมดักแค่ใน function ที่มัน check ว่า balance น่้อยกว่า totalPrice ไหม (checkCreditWallet) แต่ข้างนอกก่อนเข้า function นี้ มันก็มี if check ว่า balance น้อยกว่า ค่าที่จะส่งไป checkCreditWallet ไหม (totalPrice) ก่อนเข้า checkCreditWallet\n\nไม่งั้นมันจะกลายเป็นว่าข้างนอก check ด้วย rate + กำไร แต่ข้างใน check แค่ rate พอกดรับเงินแล้วมันจะไม่แสดงอะไรเลย\n\nเลยถอย logic การ check ออกมาจาก checkCreditWallet แล้ว check ก่อนที่จะส่งไป checkCreditWallet แทน\n',
      state: 'done',
      name: '[POP/WALLET] แก้การแสดงยอดที่จะตัด wallet',
      updatedAt: 1712716738,
      createdAt: 1712716716,
      status: 'active',
    },
    {
      boardId: 'qXcks9DaFgf0SRZ9BcxZ',
      description: '- เพิ่ม "SCG" ใส่ array BANED_COURIER_CODE',
      status: 'active',
      state: 'review',
      remarks: [
        'feature/SP-7132--shippop-b2c-hide-scg-courier-from-check-price-pa',
        'https://shippop.atlassian.net/browse/SP-7132',
      ],
      createdAt: 1712222924,
      owner: 'YYNJX159OkPVFUgmdAfMztAt4h53',
      name: '[SHIPPOP/HOMEPAGE] filter เอา courier SCG ออกจากหน้า checkprice',
      updatedAt: 1712222924,
    },
    {
      state: 'done',
      remarks: [
        'https://shippop.atlassian.net/browse/SP-7118',
        'feature/SP-7118-topup-wallet_v-2-member-verify-otp-unique-on-mem',
        'https://shippop.atlassian.net/browse/SP-7111',
      ],
      boardId: 'YRlR5TbYKPooAV1QzYNd',
      owner: 'YYNJX159OkPVFUgmdAfMztAt4h53',
      updatedAt: 1712284929,
      status: 'active',
      createdAt: 1711105695,
      name: '[MEMBER_SERVICE/VERIFICATION_WALLET] แก้ logic เก่าที่ check เบอร์โทรศัพท์ซ้ำ',
      description:
        'ของเดิมไปยืมใช้ของ shippop แล้วฝั่ง shippop มี check เบอร์ซ้ำ (1 member จะมีได้ 1 phonenumber)\n\nย้าย logic พวกนั้นมาไว้ที่ฝั่ง member service แทน แล้วตอนเรียก ฝั่ง shippop แค่ตอนจะให้ส่ง sms (รอฝั่ง shippop ทำเพิ่ม)\n\nเพิ่มการ check ว่าถ้า email ไม่มีใน member service จะสร้าง account บน member service เป็น b2c ให้ โดยใช้  shop owner มาเป็น name\n\nพวก field verified (confirmed_email, verified_phone, verified_phonenumber จะไม่บีนทึกทับของเก่า ถ้ามีข้อมูลใน field นั้นแล้ว)',
    },
    {
      owner: 'YYNJX159OkPVFUgmdAfMztAt4h53',
      state: 'done',
      status: 'active',
      createdAt: 1712633078,
      updatedAt: 1713510130,
      remarks: [
        'https://shippop.atlassian.net/browse/SP-7193',
        'feature/SP-7193-shippop-homepage-logo-all-festival',
      ],
      boardId: 'l4BXngaE8DWVkutXGFeq',
      description:
        '- ปรับ logo ของหน้า homepage (navbar และ footer) ของแต่ละเทศกาล\n- ปรับ duration การเปลี่ยน logo ของแต่ละเทศกาล',
      name: '[SHIPPOP/HOMEPAGE] ปรับ logo ให้เปลี่ยนไปตามแต่ละเทศกาล',
    },
    {
      updatedAt: 1715585982,
      createdAt: 1715064597,
      description:
        'investigate + optimize cod calendar ของ apptracking\n\nshippop api\n- https://mkpservice.mhooeng.com/report-cod/transfer/date/\npayload body \n"api_key": "22921251E67EE",\n"start_date": "2020-01-01",\n"end_date": "2020-01-31"\n\npop api\n- http://localhost/report/calendar-cod?date=2020-01 GET request with token in header\n- http://localhost/customer/login POST request with tel and passowrd payload body ',
      name: '[POPSHOP/COD_CALENDAR] optimize การดึงข้อมูล cod calendar',
      owner: 'YYNJX159OkPVFUgmdAfMztAt4h53',
      boardId: 'tpfvMQcWEWUsX8lEuqa0',
      remarks: [
        'hotfix/SP-7145-optimize-cod-calendar',
        'https://shippop.atlassian.net/browse/SP-7145',
      ],
      state: 'in-progress',
      status: 'active',
    },
    {
      createdAt: 1710675775,
      status: 'active',
      owner: 'YYNJX159OkPVFUgmdAfMztAt4h53',
      name: '[SHIPPOP/CUSTOMER_STATUS] เปลี่ยน logic การ update customer status',
      updatedAt: 1710675775,
      description:
        '- สถานะปรับทุกวัน, เงื่อนไขทุก 30 วัน- เพิ่มสถานะใหม่ SLICENCE, LOSS- เพิ่ม crontab สำหรับรันทุกวัน- สรุปข้อมูลจำนวน  shipment daily_stat_courier_market- รันหลังจาก update stat shipment',
      boardId: '3CW9qQCAXyxD7BfLTpRg',
      state: 'done',
      remarks: [
        'feature/SP-7047--customer_status-change-logic',
        'https://shippop.atlassian.net/browse/SP-7047',
        'https://gitlab.com/shippopth/SHIPPOP/-/merge_requests/14600',
      ],
    },
    {
      createdAt: 1714384242,
      state: 'done',
      updatedAt: 1714702370,
      description:
        "- function ที่ใช้ map ค่า check เงื่อนไขผิด (function strToJson)\n- typeof yourVariable === 'object' ต้องเป็น typeof input === 'object' โดย input คือ parameter ของ function\n- !Array.isArray(input) ต้องไม่มี ! เพราะเงื่อนไขนี้ต้องการจะ check ว่า parameter input ที่ส่งเข้ามา array ใช่หรือไม่ ถ้าเป็น object จะ JSON.parse ก่อนแล้วค่อย return ",
      remarks: [
        'https://shippop.atlassian.net/browse/SP-7222',
        'hotfix/SP-7222-reject-reason-does-not-show',
      ],
      boardId: 'lvkKKxfFnxaLKwF0rAfH',
      owner: 'YYNJX159OkPVFUgmdAfMztAt4h53',
      status: 'active',
      name: '[MEMBER/COD] เหตุผลของการ reject ไม่แสดง',
    },
    {
      state: 'done',
      status: 'active',
      description:
        'แก้โดย ไปดักที่ function validation ที่ controller โดย check ว่า $_FILES มี value หรือ section ของแต่ละไฟล์มี chage อะไรไหม ถึงจะ validate',
      boardId: 'gHnYyMyyUMzpmCtw8CJF',
      createdAt: 1710676231,
      name: '[MARKET_DOCUMENT] แก้ให้ไม่ต้อง require ไฟล์',
      owner: 'YYNJX159OkPVFUgmdAfMztAt4h53',
      updatedAt: 1710676231,
      remarks: ['https://shippop.atlassian.net/browse/SP-7041'],
    },
    {
      remarks: [],
      name: '[LineBot/Ledger] ปรับ dialogflow',
      updatedAt: 1712584289,
      state: 'todo',
      createdAt: 1712584161,
      description: 'แก้ intent ให้ดูไหลลื่น',
      status: 'active',
      boardId: 'C0PrX8HGxnkQqNWIP7nU',
      owner: 'YYNJX159OkPVFUgmdAfMztAt4h53',
    },
    {
      description:
        'ของเดิมพื้นที่พิเศษ ที่น้ำหนักน้อยกว่า 1kg จะคิดค่าพิ้นที่พิเศษ 15 บาท แก้เป็นไม่ต้องเช็คน้ำหนักสำหรับการคิดค่าพื้นที่พิเศษเพิ่ม remote area (version config เป็น 77)20120, 23170, 81150, 81210, 82160, 83000, 83100, 83110, 83120, 83130, 83150, 83151, 84140, 84280, 84310, 84320, 84330, 84360',
      boardId: '3CW9qQCAXyxD7BfLTpRg',
      remarks: [
        'feature/SP-7099-emst-pop-fix-special-area-condition-affect-on-1',
        'https://gitlab.com/shippopth/pop-shippop/pop-shippop-frontend/-/merge_requests/878',
        'https://gitlab.com/shippopth/pop-shippop/shopx-backend/-/merge_requests/1029',
        'https://shippop.atlassian.net/browse/SP-7099',
      ],
      state: 'done',
      status: 'active',
      createdAt: 1710675553,
      owner: 'YYNJX159OkPVFUgmdAfMztAt4h53',
      updatedAt: 1710675553,
      name: '[POP] แก้เงื่อนไขของขนส่ง EMST',
    },
    {
      state: 'done',
      description:
        '- ปุ่ม export excel ไม่สามารถใช้งานได้ (/history/usagewallet)\n- frontend เอา rawdata มาทำ excel เอง',
      status: 'active',
      boardId: 'l4BXngaE8DWVkutXGFeq',
      createdAt: 1712633419,
      updatedAt: 1712716451,
      name: '[POP/WALLET] แก้ export excel ไม่ได้',
      owner: 'YYNJX159OkPVFUgmdAfMztAt4h53',
      remarks: [
        'https://shippop.atlassian.net/browse/SP-7200',
        'feature/SP-7200-pop-wallet-export-report-excel-file-from-wallet',
      ],
    },
    {
      name: '[POP/WALLET] สามารถเปลี่ยน email ที่จะใช้ verify wallet ได้',
      description:
        '- มีปุ่มที่กดแล้ว เปิดให้แก้ email เองได้ ที่ modal แจ้งเตืนให้ verify wallet\n- พอกด submit call api ไปหา pop เพื่อ check ว่า\n  - email ต้องไม่มีในตาราง users\n  - ถ้ามี email ในตาราง users shop_id ต้องตรงกัน\n  - email ต้องยังไม่ถูก verifiy ที่ตาราง wallect_account (column verified)\n- ถ้า check ผ่านต้อง call api ไป update email ที่ wallet service (อาจต้องยิง login กับ wallet service ก่อน)\n- update email ที่ตาราง wallet_account ของ pop\n- เข้า flow เดิมของ member service เหมือนเดิม',
      remarks: [
        'https://shippop.atlassian.net/browse/SP-7175',
        'feature/SP-7175-topup-wallet_v-2-pop-free-to-input-email-verific',
        'มีทั้ง frontend และ backend',
      ],
      status: 'active',
      state: 'done',
      boardId: 'qXcks9DaFgf0SRZ9BcxZ',
      updatedAt: 1712287699,
      createdAt: 1711515508,
      owner: 'YYNJX159OkPVFUgmdAfMztAt4h53',
    },
    {
      boardId: 'gHnYyMyyUMzpmCtw8CJF',
      remarks: [
        'https://shippop.atlassian.net/browse/SP-7053',
        'https://gitlab.com/shippopth/SHIPPOP/-/merge_requests/14562',
      ],
      name: '[MARKET_DOCUMENT] แก้ alert api key ตอนเรียก delete file',
      state: 'done',
      owner: 'YYNJX159OkPVFUgmdAfMztAt4h53',
      description:
        'เปลี่ยน initmode จาก file เป็น db เพราะบางทีมันเอา api_key ที่แนบไปแล้วหาจากไฟล์ไม่เจอ เลยต้องใช้จาก db แทน',
      updatedAt: 1710676176,
      status: 'active',
      createdAt: 1710676176,
    },
    {
      status: 'active',
      owner: 'YYNJX159OkPVFUgmdAfMztAt4h53',
      remarks: [
        'https://shippop.atlassian.net/browse/SP-7286',
        'feature/SP-7286-move-result-file-and-internal-memmory',
      ],
      boardId: 'tpfvMQcWEWUsX8lEuqa0',
      updatedAt: 1715584015,
      state: 'review',
      description:
        'file\n- ของเดิมเก็บไปใน volume ของ container ถ้า build ใหม่ volume ก็จะหาย\n- ของใหม่เก็บไว้ที่ s3 buckget mygroup-(dev/prod) / bi / bill-checking\n',
      createdAt: 1715156402,
      name: '[BI/CHECK_BILL] ย้ายการเก็บไฟล์และ internal memory',
    },
    {
      remarks: [
        'https://shippop.atlassian.net/browse/SP-7194',
        'feature/SP-7200-pop-wallet-export-report-excel-file-from-wallet',
        'branch เดียวกับ SP-7200',
      ],
      updatedAt: 1712716447,
      owner: 'YYNJX159OkPVFUgmdAfMztAt4h53',
      createdAt: 1712633288,
      status: 'active',
      boardId: 'l4BXngaE8DWVkutXGFeq',
      name: '[POP/WALLET] hide column เงินที่เหลือ ในหน้าประวัติของ wallet',
      description:
        '- user งง เพราะ column นี้ มีรวมยอดที่ pending ด้วย\n- แก้ ui ให้ hide column นั้นอย่างเดียว',
      state: 'done',
    },
    {
      state: 'done',
      status: 'active',
      description: 'เพิ่ม postcode remote area/special areaDHL71000',
      remarks: [
        'https://gitlab.com/shippopth/pop-shippop/pop-shippop-frontend/-/merge_requests/886',
        'https://gitlab.com/shippopth/pop-shippop/shopx-backend/-/merge_requests/1030/diffs',
        'https://shippop.atlassian.net/browse/SP-7062',
      ],
      boardId: '3CW9qQCAXyxD7BfLTpRg',
      owner: 'YYNJX159OkPVFUgmdAfMztAt4h53',
      updatedAt: 1710675730,
      name: '[POP/DHL]  เพิ่ม remote area ปากแพรก กาญจนบุรี 71000',
      createdAt: 1710675730,
    },
    {
      remarks: [
        'https://gitlab.com/shippopth/pop-shippop/pop-shippop-frontend/-/merge_requests/852',
        'https://shippop.atlassian.net/browse/SP-7026',
      ],
      boardId: 'gHnYyMyyUMzpmCtw8CJF',
      status: 'active',
      owner: 'YYNJX159OkPVFUgmdAfMztAt4h53',
      updatedAt: 1710676120,
      name: '[POP] เพิ่ม text แจ้งเตือนการแก้ไข email',
      description:
        'เพื่ม text "ไม่สามารถแก้ไขข้อมูลได้ในภายหลัง โปรดใช้ข้อมูลจริงเท่านั้น"',
      createdAt: 1710676120,
      state: 'done',
    },
    {
      remarks: [
        'hotfix/SP-7009-fleds-shippop-fleds-not-saved-error-message',
        'https://shippop.atlassian.net/browse/SP-7009',
        'https://gitlab.com/shippopth/SHIPPOP/-/merge_requests/14608',
      ],
      boardId: '3CW9qQCAXyxD7BfLTpRg',
      state: 'done',
      createdAt: 1710675607,
      status: 'active',
      updatedAt: 1710675607,
      name: '[SHIPPOP/FLEDS] error message ไม่ save ตอน call api ไปหา ขนส่ง',
      description:
        'ถ้า call ไปหา courier แล้ว error ให้ return error ออกจาก fn addOorder ด้วยsave error message ลงทั้งตาราง order และ log_fleds',
      owner: 'YYNJX159OkPVFUgmdAfMztAt4h53',
    },
    {
      remarks: ['https://www.youtube.com/watch?v=aSlK3GhRuXA'],
      boardId: 'U8ZHASyHYpOl5Ie1SVLB',
      state: 'todo',
      name: '[OTHER] ทำ config style ที่ใช้บ่อยๆ',
      description:
        'สร้าง config style ของ tailwindcss ที่ใช้บ่อยๆ (พวก shadow) ref ตาม youtube ใน remark',
      createdAt: 1711429681,
      status: 'active',
      owner: 'YYNJX159OkPVFUgmdAfMztAt4h53',
      updatedAt: 1711429681,
    },
    {
      updatedAt: 1712284947,
      owner: 'YYNJX159OkPVFUgmdAfMztAt4h53',
      state: 'done',
      boardId: 'YRlR5TbYKPooAV1QzYNd',
      description:
        'เพิ่มการออกใบแจ้งหนี้ที่เป็นค่าบริการ (premium service) \n\n- ส่วนลด จะ effect แค่กับค่าขนส่งเท่านั้น',
      remarks: [
        'https://shippop.atlassian.net/browse/SP-7107',
        'feature/SP-7107-adminv2-iot-type-other-fee-',
        'มีทั้ง shippop และ shippop_internal_admin_ui',
      ],
      status: 'active',
      createdAt: 1711106450,
      name: '[ADMIN/CUSTOM_FEE] เพิ่ม type ใหม่ premium service',
    },
    {
      state: 'done',
      updatedAt: 1714702364,
      remarks: [
        'hotfix/SP-7240-adminv2-iot-show-wrong-value',
        'https://shippop.atlassian.net/browse/SP-7240',
      ],
      status: 'active',
      owner: 'YYNJX159OkPVFUgmdAfMztAt4h53',
      name: '[SHIPPOP/ADMIN] IOT แสดงข้อมูล total ผิด (email)',
      boardId: 'lvkKKxfFnxaLKwF0rAfH',
      createdAt: 1714104182,
      description:
        'ใบแจ้งหนี้ IOT type premium service ไม่นำยอดมาแสดงที่ total ในอีเมลด้วย ทำให้ลูกค้าโอนยอดผิด\n\nใบแจ้งหนี้ IOT ไม่แสดงค่าขนส่ง\n\nเช็คเพิ่มเรื่อง type เนื่องจากใบแจ้งหนี้ IOT รวมทั้งค่าขนส่งและค่าบริการ',
    },
    {
      owner: 'YYNJX159OkPVFUgmdAfMztAt4h53',
      state: 'done',
      name: '[SHIPPOP/CUSTOMER_STATUS] crontab สำหรับ update ตาราง daily_stat_courier_market',
      description:
        'crontab สำหรับ update ตาราง daily_stat_courier_market เพื่อ update data สำหรับเอาไปใช้ใน crontab update customer statusย้าย crontab ที่ update firstship มารวมที่เดียวกัน โดย run firstship -> daily stat courier',
      status: 'active',
      updatedAt: 1710675849,
      boardId: '3CW9qQCAXyxD7BfLTpRg',
      remarks: [
        'feature/SP-7117-customer_status-stat-crontab-for-update-get-ship',
        'https://shippop.atlassian.net/browse/SP-7117',
        'https://gitlab.com/shippopth/SHIPPOP/-/merge_requests/14612',
      ],
      createdAt: 1710675849,
    },
    {
      updatedAt: 1714104659,
      description:
        '- import file แล้วแปลงข้อมูลเป็น json\n- หลังบ้าน process แบบ background process โดยใช้ key ที่จะเป็นชื่อไฟล์สำหรับจะ export excell ในการเก็บ internal memory ว่า process เสร็จหรือยัง โดยไฟล์ที่ process เสร็จแล้วจะเก็บไว้ที่ตัว server เอง (path data/check-bill)\n- หน้าบ้านเพิ่มตารางสำหรับดู process (processing/done)\n- ถ้า done จะสามารถกดโหลดไฟล์นั้นได้\n- เพิ่ม checkbox สำหรับ replace ไฟล์เก่า\n- ถ้าตอนที่ไฟล์ A กำลัง processing อยู่ แล้วมีการแก้ไฟล์ A แล้ว upload ใหม่ เบื้องหลังจะไม่ได้ไป cancel task เก่าที่ prcess อยู่ เพราะทำไม่ได้ แต่เป็นการเปลี่ยนค่าใน internal memory ที่ key เดิมเป็นเป็นของ A edit เฉยๆ\n(process นี้จะทำก็ต่อเมื่อมีการ checked ที่ checkbox ที่ frontend)',
      status: 'active',
      createdAt: 1712894381,
      name: '[BI/CHECK_BILL] import data สำหรับ check bill',
      owner: 'YYNJX159OkPVFUgmdAfMztAt4h53',
      boardId: 'l4BXngaE8DWVkutXGFeq',
      remarks: [
        'feature/SP-7208-bi-check_bill-page-for-import-check-bill',
        'https://shippop.atlassian.net/browse/SP-7208',
      ],
      state: 'in-progress',
    },
    {
      updatedAt: 1711429689,
      state: 'done',
      remarks: [],
      description:
        'หลังจาก create สำเร็จ (workspace, board, task) จะได้ id return กลับมา ให้ redirect ไปหน้านั้นๆ',
      status: 'active',
      owner: 'YYNJX159OkPVFUgmdAfMztAt4h53',
      name: '[Tasks Management] Auto redirect เมื่อ submit form ตอน create',
      createdAt: 1711363159,
      boardId: 'U8ZHASyHYpOl5Ie1SVLB',
    },
  ])

  const handleMigrate = () => {
    const data: Task[] = tasks.map((w) => {
      let boardId = ''

      switch (w.boardId) {
        case '3CW9qQCAXyxD7BfLTpRg':
          boardId = 'a3FTrVOiB0G5yQWNDb6q'
          break
        case 'C0PrX8HGxnkQqNWIP7nU':
          boardId = 'CXfM9KwcX8PAqXeXjQNK'
          break
        case 'U8ZHASyHYpOl5Ie1SVLB':
          boardId = '7OXzkTJMIgCCsUljKP4D'
          break
        case 'YRlR5TbYKPooAV1QzYNd':
          boardId = 'WOcWqXaVBi5gQxa2u634'
          break
        case 'gHnYyMyyUMzpmCtw8CJF':
          boardId = 'DyXOLwUsHWZ9K3tyPWSm'
          break
        case 'l4BXngaE8DWVkutXGFeq':
          boardId = 'qmdUrtP098QQKrtciRXj'
          break
        case 'lvkKKxfFnxaLKwF0rAfH':
          boardId = 'XL5CfRqxgKgH51DOQ5g5'
          break
        case 'qXcks9DaFgf0SRZ9BcxZ':
          boardId = '76Javt1XUC69UNlwl9pI'
          break
        case 'tpfvMQcWEWUsX8lEuqa0':
          boardId = 'vnP8gtobGGLCSM9pJcQr'
          break
        default:
          boardId = ''
          break
      }

      return {
        groupId: boardId,
        name: w.name,
        tag: '',
        description: w.description,
        owner: w.owner,
        isDeleted: w.status === 'active' ? false : true,
        status: w.state,
        remarks: w.remarks.map((r) => r),
        createdAt: dayjs.unix(w.createdAt).format(),
        updatedAt: dayjs.unix(w.updatedAt).format(),
      }
    })

    const promises: any[] = []

    const migration = (d: any) => {
      fetch('/api/migrate', {
        method: 'POST',
        body: JSON.stringify(d),
      })
    }

    data.map((d) => promises.push(migration(d)))

    Promise.all(promises).then(() => {
      console.log('Migration done')
    })
  }

  return (
    <div>
      <Button onClick={handleMigrate}>Migrate</Button>
    </div>
  )
}

export default PlaygroundPage
