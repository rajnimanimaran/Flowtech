﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessEntities.BOM_Master
{
     public class BOM_masterEntity
    {
        public int BOMID { get; set; }
        public string BOMCode { get; set; }
        public string BOMName { get; set; }
        public int prdID { get; set; }
        public string prdName { get; set; }
        public int RMID { get; set; }
        public string RMName { get; set; }
        public int quantity { get; set; }
        public int UOMID { get; set; }
        public string UOMName { get; set; }
        public bool IsActive { get; set; }
        public int ActionBy { get; set; }
    }
}
