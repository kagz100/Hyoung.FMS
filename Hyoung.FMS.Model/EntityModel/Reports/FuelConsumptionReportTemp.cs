using System;
using System.Collections.Generic;
using System.Text;

namespace Hyoung.FMS.Model.EntityModel.Reports
{

    // NOTE: Generated code may require at least .NET Framework 4.5 or .NET Core/Standard 2.0.
    /// <remarks/>
    [System.SerializableAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://gpsgate.com/xml/")]
    [System.Xml.Serialization.XmlRootAttribute(Namespace = "http://gpsgate.com/xml/", IsNullable = false)]
    public partial class Templates
    {

        private TemplatesTemplateObject[][] templateField;

        /// <remarks/>
        [System.Xml.Serialization.XmlArrayItemAttribute("Object", typeof(TemplatesTemplateObject), IsNullable = false)]
        public TemplatesTemplateObject[][] Template
        {
            get
            {
                return this.templateField;
            }
            set
            {
                this.templateField = value;
            }
        }
    }

    /// <remarks/>
    [System.SerializableAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://gpsgate.com/xml/")]
    public partial class TemplatesTemplateObject
    {

        private string templateGuidField;

        private byte templateVersionField;

        private string objectTypeField;

        private TemplatesTemplateObjectObjectData objectDataField;

        private string readOnlyField;

        /// <remarks/>
        public string TemplateGuid
        {
            get
            {
                return this.templateGuidField;
            }
            set
            {
                this.templateGuidField = value;
            }
        }

        /// <remarks/>
        public byte TemplateVersion
        {
            get
            {
                return this.templateVersionField;
            }
            set
            {
                this.templateVersionField = value;
            }
        }

        /// <remarks/>
        public string ObjectType
        {
            get
            {
                return this.objectTypeField;
            }
            set
            {
                this.objectTypeField = value;
            }
        }

        /// <remarks/>
        public TemplatesTemplateObjectObjectData ObjectData
        {
            get
            {
                return this.objectDataField;
            }
            set
            {
                this.objectDataField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public string ReadOnly
        {
            get
            {
                return this.readOnlyField;
            }
            set
            {
                this.readOnlyField = value;
            }
        }
    }

    /// <remarks/>
    [System.SerializableAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://gpsgate.com/xml/")]
    public partial class TemplatesTemplateObjectObjectData
    {

        private TemplatesTemplateObjectObjectDataReportDefinition reportDefinitionField;

        private TemplatesTemplateObjectObjectDataReportDataProvider reportDataProviderField;

        private TemplatesTemplateObjectObjectDataQuery queryField;

        /// <remarks/>
        public TemplatesTemplateObjectObjectDataReportDefinition ReportDefinition
        {
            get
            {
                return this.reportDefinitionField;
            }
            set
            {
                this.reportDefinitionField = value;
            }
        }

        /// <remarks/>
        public TemplatesTemplateObjectObjectDataReportDataProvider ReportDataProvider
        {
            get
            {
                return this.reportDataProviderField;
            }
            set
            {
                this.reportDataProviderField = value;
            }
        }

        /// <remarks/>
        public TemplatesTemplateObjectObjectDataQuery Query
        {
            get
            {
                return this.queryField;
            }
            set
            {
                this.queryField = value;
            }
        }
    }

    /// <remarks/>
    [System.SerializableAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://gpsgate.com/xml/")]
    public partial class TemplatesTemplateObjectObjectDataReportDefinition
    {

        private string nameField;

        private string scopeIDField;

        private string descriptionField;

        private string appTemplateField;

        private string queryField;

        private TemplatesTemplateObjectObjectDataReportDefinitionTableDefinition tableDefinitionField;

        /// <remarks/>
        public string Name
        {
            get
            {
                return this.nameField;
            }
            set
            {
                this.nameField = value;
            }
        }

        /// <remarks/>
        public string ScopeID
        {
            get
            {
                return this.scopeIDField;
            }
            set
            {
                this.scopeIDField = value;
            }
        }

        /// <remarks/>
        public string Description
        {
            get
            {
                return this.descriptionField;
            }
            set
            {
                this.descriptionField = value;
            }
        }

        /// <remarks/>
        public string AppTemplate
        {
            get
            {
                return this.appTemplateField;
            }
            set
            {
                this.appTemplateField = value;
            }
        }

        /// <remarks/>
        public string Query
        {
            get
            {
                return this.queryField;
            }
            set
            {
                this.queryField = value;
            }
        }

        /// <remarks/>
        public TemplatesTemplateObjectObjectDataReportDefinitionTableDefinition TableDefinition
        {
            get
            {
                return this.tableDefinitionField;
            }
            set
            {
                this.tableDefinitionField = value;
            }
        }
    }

    /// <remarks/>
    [System.SerializableAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://gpsgate.com/xml/")]
    public partial class TemplatesTemplateObjectObjectDataReportDefinitionTableDefinition
    {

        private TemplatesTemplateObjectObjectDataReportDefinitionTableDefinitionPageDefinition pageDefinitionField;

        private object columnsField;

        private TemplatesTemplateObjectObjectDataReportDefinitionTableDefinitionRegions regionsField;

        private bool defaultStylesField;

        /// <remarks/>
        public TemplatesTemplateObjectObjectDataReportDefinitionTableDefinitionPageDefinition pageDefinition
        {
            get
            {
                return this.pageDefinitionField;
            }
            set
            {
                this.pageDefinitionField = value;
            }
        }

        /// <remarks/>
        public object Columns
        {
            get
            {
                return this.columnsField;
            }
            set
            {
                this.columnsField = value;
            }
        }

        /// <remarks/>
        public TemplatesTemplateObjectObjectDataReportDefinitionTableDefinitionRegions Regions
        {
            get
            {
                return this.regionsField;
            }
            set
            {
                this.regionsField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public bool defaultStyles
        {
            get
            {
                return this.defaultStylesField;
            }
            set
            {
                this.defaultStylesField = value;
            }
        }
    }

    /// <remarks/>
    [System.SerializableAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://gpsgate.com/xml/")]
    public partial class TemplatesTemplateObjectObjectDataReportDefinitionTableDefinitionPageDefinition
    {

        private string pageFormatField;

        private byte[] columnWidthsField;

        /// <remarks/>
        public string pageFormat
        {
            get
            {
                return this.pageFormatField;
            }
            set
            {
                this.pageFormatField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlArrayAttribute()]
        [System.Xml.Serialization.XmlArrayItemAttribute("double", IsNullable = false)]
        public byte[] columnWidths
        {
            get
            {
                return this.columnWidthsField;
            }
            set
            {
                this.columnWidthsField = value;
            }
        }
    }

    /// <remarks/>
    [System.SerializableAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://gpsgate.com/xml/")]
    public partial class TemplatesTemplateObjectObjectDataReportDefinitionTableDefinitionRegions
    {

        private TemplatesTemplateObjectObjectDataReportDefinitionTableDefinitionRegionsRegion regionField;

        /// <remarks/>
        public TemplatesTemplateObjectObjectDataReportDefinitionTableDefinitionRegionsRegion Region
        {
            get
            {
                return this.regionField;
            }
            set
            {
                this.regionField = value;
            }
        }
    }

    /// <remarks/>
    [System.SerializableAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://gpsgate.com/xml/")]
    public partial class TemplatesTemplateObjectObjectDataReportDefinitionTableDefinitionRegionsRegion
    {

        private TemplatesTemplateObjectObjectDataReportDefinitionTableDefinitionRegionsRegionHeader headerField;

        private TemplatesTemplateObjectObjectDataReportDefinitionTableDefinitionRegionsRegionItem itemField;

        private TemplatesTemplateObjectObjectDataReportDefinitionTableDefinitionRegionsRegionFooter footerField;

        private bool repeatHeaderField;

        private bool pageBreakField;

        private string expressionField;

        private byte levelField;

        private string sortExpressionField;

        private string sortDirectionField;

        /// <remarks/>
        public TemplatesTemplateObjectObjectDataReportDefinitionTableDefinitionRegionsRegionHeader Header
        {
            get
            {
                return this.headerField;
            }
            set
            {
                this.headerField = value;
            }
        }

        /// <remarks/>
        public TemplatesTemplateObjectObjectDataReportDefinitionTableDefinitionRegionsRegionItem Item
        {
            get
            {
                return this.itemField;
            }
            set
            {
                this.itemField = value;
            }
        }

        /// <remarks/>
        public TemplatesTemplateObjectObjectDataReportDefinitionTableDefinitionRegionsRegionFooter Footer
        {
            get
            {
                return this.footerField;
            }
            set
            {
                this.footerField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public bool repeatHeader
        {
            get
            {
                return this.repeatHeaderField;
            }
            set
            {
                this.repeatHeaderField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public bool pageBreak
        {
            get
            {
                return this.pageBreakField;
            }
            set
            {
                this.pageBreakField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public string expression
        {
            get
            {
                return this.expressionField;
            }
            set
            {
                this.expressionField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public byte level
        {
            get
            {
                return this.levelField;
            }
            set
            {
                this.levelField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public string sortExpression
        {
            get
            {
                return this.sortExpressionField;
            }
            set
            {
                this.sortExpressionField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public string sortDirection
        {
            get
            {
                return this.sortDirectionField;
            }
            set
            {
                this.sortDirectionField = value;
            }
        }
    }

    /// <remarks/>
    [System.SerializableAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://gpsgate.com/xml/")]
    public partial class TemplatesTemplateObjectObjectDataReportDefinitionTableDefinitionRegionsRegionHeader
    {

        private TemplatesTemplateObjectObjectDataReportDefinitionTableDefinitionRegionsRegionHeaderRegionRow regionRowField;

        private string kindField;

        /// <remarks/>
        public TemplatesTemplateObjectObjectDataReportDefinitionTableDefinitionRegionsRegionHeaderRegionRow RegionRow
        {
            get
            {
                return this.regionRowField;
            }
            set
            {
                this.regionRowField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public string kind
        {
            get
            {
                return this.kindField;
            }
            set
            {
                this.kindField = value;
            }
        }
    }

    /// <remarks/>
    [System.SerializableAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://gpsgate.com/xml/")]
    public partial class TemplatesTemplateObjectObjectDataReportDefinitionTableDefinitionRegionsRegionHeaderRegionRow
    {

        private TemplatesTemplateObjectObjectDataReportDefinitionTableDefinitionRegionsRegionHeaderRegionRowColumn[] columnField;

        private string idField;

        private bool visibilityExpressionField;

        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute("Column")]
        public TemplatesTemplateObjectObjectDataReportDefinitionTableDefinitionRegionsRegionHeaderRegionRowColumn[] Column
        {
            get
            {
                return this.columnField;
            }
            set
            {
                this.columnField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public string id
        {
            get
            {
                return this.idField;
            }
            set
            {
                this.idField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public bool VisibilityExpression
        {
            get
            {
                return this.visibilityExpressionField;
            }
            set
            {
                this.visibilityExpressionField = value;
            }
        }
    }

    /// <remarks/>
    [System.SerializableAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://gpsgate.com/xml/")]
    public partial class TemplatesTemplateObjectObjectDataReportDefinitionTableDefinitionRegionsRegionHeaderRegionRowColumn
    {

        private TemplatesTemplateObjectObjectDataReportDefinitionTableDefinitionRegionsRegionHeaderRegionRowColumnLayout layoutField;

        private TemplatesTemplateObjectObjectDataReportDefinitionTableDefinitionRegionsRegionHeaderRegionRowColumnAltLayout altLayoutField;

        private string expressionField;

        private string visibilityExpressionField;

        private string actionField;

        private string idField;

        private byte cspanField;

        private string unitField;

        private bool escapeField;

        /// <remarks/>
        public TemplatesTemplateObjectObjectDataReportDefinitionTableDefinitionRegionsRegionHeaderRegionRowColumnLayout Layout
        {
            get
            {
                return this.layoutField;
            }
            set
            {
                this.layoutField = value;
            }
        }

        /// <remarks/>
        public TemplatesTemplateObjectObjectDataReportDefinitionTableDefinitionRegionsRegionHeaderRegionRowColumnAltLayout AltLayout
        {
            get
            {
                return this.altLayoutField;
            }
            set
            {
                this.altLayoutField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public string expression
        {
            get
            {
                return this.expressionField;
            }
            set
            {
                this.expressionField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public string visibilityExpression
        {
            get
            {
                return this.visibilityExpressionField;
            }
            set
            {
                this.visibilityExpressionField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public string action
        {
            get
            {
                return this.actionField;
            }
            set
            {
                this.actionField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public string id
        {
            get
            {
                return this.idField;
            }
            set
            {
                this.idField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public byte cspan
        {
            get
            {
                return this.cspanField;
            }
            set
            {
                this.cspanField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public string unit
        {
            get
            {
                return this.unitField;
            }
            set
            {
                this.unitField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public bool escape
        {
            get
            {
                return this.escapeField;
            }
            set
            {
                this.escapeField = value;
            }
        }
    }

    /// <remarks/>
    [System.SerializableAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://gpsgate.com/xml/")]
    public partial class TemplatesTemplateObjectObjectDataReportDefinitionTableDefinitionRegionsRegionHeaderRegionRowColumnLayout
    {

        private string styleField;

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public string style
        {
            get
            {
                return this.styleField;
            }
            set
            {
                this.styleField = value;
            }
        }
    }

    /// <remarks/>
    [System.SerializableAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://gpsgate.com/xml/")]
    public partial class TemplatesTemplateObjectObjectDataReportDefinitionTableDefinitionRegionsRegionHeaderRegionRowColumnAltLayout
    {

        private string styleField;

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public string style
        {
            get
            {
                return this.styleField;
            }
            set
            {
                this.styleField = value;
            }
        }
    }

    /// <remarks/>
    [System.SerializableAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://gpsgate.com/xml/")]
    public partial class TemplatesTemplateObjectObjectDataReportDefinitionTableDefinitionRegionsRegionItem
    {

        private TemplatesTemplateObjectObjectDataReportDefinitionTableDefinitionRegionsRegionItemRegionRow regionRowField;

        private string kindField;

        /// <remarks/>
        public TemplatesTemplateObjectObjectDataReportDefinitionTableDefinitionRegionsRegionItemRegionRow RegionRow
        {
            get
            {
                return this.regionRowField;
            }
            set
            {
                this.regionRowField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public string kind
        {
            get
            {
                return this.kindField;
            }
            set
            {
                this.kindField = value;
            }
        }
    }

    /// <remarks/>
    [System.SerializableAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://gpsgate.com/xml/")]
    public partial class TemplatesTemplateObjectObjectDataReportDefinitionTableDefinitionRegionsRegionItemRegionRow
    {

        private TemplatesTemplateObjectObjectDataReportDefinitionTableDefinitionRegionsRegionItemRegionRowColumn[] columnField;

        private string idField;

        private bool visibilityExpressionField;

        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute("Column")]
        public TemplatesTemplateObjectObjectDataReportDefinitionTableDefinitionRegionsRegionItemRegionRowColumn[] Column
        {
            get
            {
                return this.columnField;
            }
            set
            {
                this.columnField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public string id
        {
            get
            {
                return this.idField;
            }
            set
            {
                this.idField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public bool VisibilityExpression
        {
            get
            {
                return this.visibilityExpressionField;
            }
            set
            {
                this.visibilityExpressionField = value;
            }
        }
    }

    /// <remarks/>
    [System.SerializableAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://gpsgate.com/xml/")]
    public partial class TemplatesTemplateObjectObjectDataReportDefinitionTableDefinitionRegionsRegionItemRegionRowColumn
    {

        private TemplatesTemplateObjectObjectDataReportDefinitionTableDefinitionRegionsRegionItemRegionRowColumnLayout layoutField;

        private TemplatesTemplateObjectObjectDataReportDefinitionTableDefinitionRegionsRegionItemRegionRowColumnAltLayout altLayoutField;

        private string expressionField;

        private string visibilityExpressionField;

        private string actionField;

        private string idField;

        private byte cspanField;

        private string unitField;

        private bool escapeField;

        /// <remarks/>
        public TemplatesTemplateObjectObjectDataReportDefinitionTableDefinitionRegionsRegionItemRegionRowColumnLayout Layout
        {
            get
            {
                return this.layoutField;
            }
            set
            {
                this.layoutField = value;
            }
        }

        /// <remarks/>
        public TemplatesTemplateObjectObjectDataReportDefinitionTableDefinitionRegionsRegionItemRegionRowColumnAltLayout AltLayout
        {
            get
            {
                return this.altLayoutField;
            }
            set
            {
                this.altLayoutField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public string expression
        {
            get
            {
                return this.expressionField;
            }
            set
            {
                this.expressionField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public string visibilityExpression
        {
            get
            {
                return this.visibilityExpressionField;
            }
            set
            {
                this.visibilityExpressionField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public string action
        {
            get
            {
                return this.actionField;
            }
            set
            {
                this.actionField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public string id
        {
            get
            {
                return this.idField;
            }
            set
            {
                this.idField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public byte cspan
        {
            get
            {
                return this.cspanField;
            }
            set
            {
                this.cspanField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public string unit
        {
            get
            {
                return this.unitField;
            }
            set
            {
                this.unitField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public bool escape
        {
            get
            {
                return this.escapeField;
            }
            set
            {
                this.escapeField = value;
            }
        }
    }

    /// <remarks/>
    [System.SerializableAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://gpsgate.com/xml/")]
    public partial class TemplatesTemplateObjectObjectDataReportDefinitionTableDefinitionRegionsRegionItemRegionRowColumnLayout
    {

        private string styleField;

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public string style
        {
            get
            {
                return this.styleField;
            }
            set
            {
                this.styleField = value;
            }
        }
    }

    /// <remarks/>
    [System.SerializableAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://gpsgate.com/xml/")]
    public partial class TemplatesTemplateObjectObjectDataReportDefinitionTableDefinitionRegionsRegionItemRegionRowColumnAltLayout
    {

        private string styleField;

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public string style
        {
            get
            {
                return this.styleField;
            }
            set
            {
                this.styleField = value;
            }
        }
    }

    /// <remarks/>
    [System.SerializableAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://gpsgate.com/xml/")]
    public partial class TemplatesTemplateObjectObjectDataReportDefinitionTableDefinitionRegionsRegionFooter
    {

        private TemplatesTemplateObjectObjectDataReportDefinitionTableDefinitionRegionsRegionFooterRegionRow regionRowField;

        private string kindField;

        /// <remarks/>
        public TemplatesTemplateObjectObjectDataReportDefinitionTableDefinitionRegionsRegionFooterRegionRow RegionRow
        {
            get
            {
                return this.regionRowField;
            }
            set
            {
                this.regionRowField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public string kind
        {
            get
            {
                return this.kindField;
            }
            set
            {
                this.kindField = value;
            }
        }
    }

    /// <remarks/>
    [System.SerializableAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://gpsgate.com/xml/")]
    public partial class TemplatesTemplateObjectObjectDataReportDefinitionTableDefinitionRegionsRegionFooterRegionRow
    {

        private TemplatesTemplateObjectObjectDataReportDefinitionTableDefinitionRegionsRegionFooterRegionRowColumn[] columnField;

        private string idField;

        private bool visibilityExpressionField;

        /// <remarks/>
        [System.Xml.Serialization.XmlElementAttribute("Column")]
        public TemplatesTemplateObjectObjectDataReportDefinitionTableDefinitionRegionsRegionFooterRegionRowColumn[] Column
        {
            get
            {
                return this.columnField;
            }
            set
            {
                this.columnField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public string id
        {
            get
            {
                return this.idField;
            }
            set
            {
                this.idField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public bool VisibilityExpression
        {
            get
            {
                return this.visibilityExpressionField;
            }
            set
            {
                this.visibilityExpressionField = value;
            }
        }
    }

    /// <remarks/>
    [System.SerializableAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://gpsgate.com/xml/")]
    public partial class TemplatesTemplateObjectObjectDataReportDefinitionTableDefinitionRegionsRegionFooterRegionRowColumn
    {

        private TemplatesTemplateObjectObjectDataReportDefinitionTableDefinitionRegionsRegionFooterRegionRowColumnLayout layoutField;

        private TemplatesTemplateObjectObjectDataReportDefinitionTableDefinitionRegionsRegionFooterRegionRowColumnAltLayout altLayoutField;

        private string expressionField;

        private string visibilityExpressionField;

        private string actionField;

        private string idField;

        private byte cspanField;

        private bool escapeField;

        private string unitField;

        /// <remarks/>
        public TemplatesTemplateObjectObjectDataReportDefinitionTableDefinitionRegionsRegionFooterRegionRowColumnLayout Layout
        {
            get
            {
                return this.layoutField;
            }
            set
            {
                this.layoutField = value;
            }
        }

        /// <remarks/>
        public TemplatesTemplateObjectObjectDataReportDefinitionTableDefinitionRegionsRegionFooterRegionRowColumnAltLayout AltLayout
        {
            get
            {
                return this.altLayoutField;
            }
            set
            {
                this.altLayoutField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public string expression
        {
            get
            {
                return this.expressionField;
            }
            set
            {
                this.expressionField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public string visibilityExpression
        {
            get
            {
                return this.visibilityExpressionField;
            }
            set
            {
                this.visibilityExpressionField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public string action
        {
            get
            {
                return this.actionField;
            }
            set
            {
                this.actionField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public string id
        {
            get
            {
                return this.idField;
            }
            set
            {
                this.idField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public byte cspan
        {
            get
            {
                return this.cspanField;
            }
            set
            {
                this.cspanField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public bool escape
        {
            get
            {
                return this.escapeField;
            }
            set
            {
                this.escapeField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public string unit
        {
            get
            {
                return this.unitField;
            }
            set
            {
                this.unitField = value;
            }
        }
    }

    /// <remarks/>
    [System.SerializableAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://gpsgate.com/xml/")]
    public partial class TemplatesTemplateObjectObjectDataReportDefinitionTableDefinitionRegionsRegionFooterRegionRowColumnLayout
    {

        private string styleField;

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public string style
        {
            get
            {
                return this.styleField;
            }
            set
            {
                this.styleField = value;
            }
        }
    }

    /// <remarks/>
    [System.SerializableAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://gpsgate.com/xml/")]
    public partial class TemplatesTemplateObjectObjectDataReportDefinitionTableDefinitionRegionsRegionFooterRegionRowColumnAltLayout
    {

        private string styleField;

        /// <remarks/>
        [System.Xml.Serialization.XmlAttributeAttribute()]
        public string style
        {
            get
            {
                return this.styleField;
            }
            set
            {
                this.styleField = value;
            }
        }
    }

    /// <remarks/>
    [System.SerializableAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://gpsgate.com/xml/")]
    public partial class TemplatesTemplateObjectObjectDataReportDataProvider
    {

        private string nameField;

        private object descriptionField;

        private string typeField;

        private TemplatesTemplateObjectObjectDataReportDataProviderResolutions resolutionsField;

        private TemplatesTemplateObjectObjectDataReportDataProviderColumn[] columnsField;

        /// <remarks/>
        public string Name
        {
            get
            {
                return this.nameField;
            }
            set
            {
                this.nameField = value;
            }
        }

        /// <remarks/>
        public object Description
        {
            get
            {
                return this.descriptionField;
            }
            set
            {
                this.descriptionField = value;
            }
        }

        /// <remarks/>
        public string Type
        {
            get
            {
                return this.typeField;
            }
            set
            {
                this.typeField = value;
            }
        }

        /// <remarks/>
        public TemplatesTemplateObjectObjectDataReportDataProviderResolutions Resolutions
        {
            get
            {
                return this.resolutionsField;
            }
            set
            {
                this.resolutionsField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlArrayItemAttribute("Column", IsNullable = false)]
        public TemplatesTemplateObjectObjectDataReportDataProviderColumn[] Columns
        {
            get
            {
                return this.columnsField;
            }
            set
            {
                this.columnsField = value;
            }
        }
    }

    /// <remarks/>
    [System.SerializableAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://gpsgate.com/xml/")]
    public partial class TemplatesTemplateObjectObjectDataReportDataProviderResolutions
    {

        private TemplatesTemplateObjectObjectDataReportDataProviderResolutionsResolution resolutionField;

        /// <remarks/>
        public TemplatesTemplateObjectObjectDataReportDataProviderResolutionsResolution Resolution
        {
            get
            {
                return this.resolutionField;
            }
            set
            {
                this.resolutionField = value;
            }
        }
    }

    /// <remarks/>
    [System.SerializableAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://gpsgate.com/xml/")]
    public partial class TemplatesTemplateObjectObjectDataReportDataProviderResolutionsResolution
    {

        private string type_nameField;

        private string assembly_nameField;

        private string res_data_fieldField;

        private string res_data_field_typeField;

        private string res_cust_dataField;

        /// <remarks/>
        public string type_name
        {
            get
            {
                return this.type_nameField;
            }
            set
            {
                this.type_nameField = value;
            }
        }

        /// <remarks/>
        public string assembly_name
        {
            get
            {
                return this.assembly_nameField;
            }
            set
            {
                this.assembly_nameField = value;
            }
        }

        /// <remarks/>
        public string res_data_field
        {
            get
            {
                return this.res_data_fieldField;
            }
            set
            {
                this.res_data_fieldField = value;
            }
        }

        /// <remarks/>
        public string res_data_field_type
        {
            get
            {
                return this.res_data_field_typeField;
            }
            set
            {
                this.res_data_field_typeField = value;
            }
        }

        /// <remarks/>
        public string res_cust_data
        {
            get
            {
                return this.res_cust_dataField;
            }
            set
            {
                this.res_cust_dataField = value;
            }
        }
    }

    /// <remarks/>
    [System.SerializableAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://gpsgate.com/xml/")]
    public partial class TemplatesTemplateObjectObjectDataReportDataProviderColumn
    {

        private string assembly_nameField;

        private string type_nameField;

        private string col_nameField;

        private object col_descriptionField;

        private string col_custom_dataField;

        private string col_data_fieldField;

        private string col_data_field_typeField;

        private string col_data_store_slotField;

        private string col_data_store_tableField;

        /// <remarks/>
        public string assembly_name
        {
            get
            {
                return this.assembly_nameField;
            }
            set
            {
                this.assembly_nameField = value;
            }
        }

        /// <remarks/>
        public string type_name
        {
            get
            {
                return this.type_nameField;
            }
            set
            {
                this.type_nameField = value;
            }
        }

        /// <remarks/>
        public string col_name
        {
            get
            {
                return this.col_nameField;
            }
            set
            {
                this.col_nameField = value;
            }
        }

        /// <remarks/>
        public object col_description
        {
            get
            {
                return this.col_descriptionField;
            }
            set
            {
                this.col_descriptionField = value;
            }
        }

        /// <remarks/>
        public string col_custom_data
        {
            get
            {
                return this.col_custom_dataField;
            }
            set
            {
                this.col_custom_dataField = value;
            }
        }

        /// <remarks/>
        public string col_data_field
        {
            get
            {
                return this.col_data_fieldField;
            }
            set
            {
                this.col_data_fieldField = value;
            }
        }

        /// <remarks/>
        public string col_data_field_type
        {
            get
            {
                return this.col_data_field_typeField;
            }
            set
            {
                this.col_data_field_typeField = value;
            }
        }

        /// <remarks/>
        public string col_data_store_slot
        {
            get
            {
                return this.col_data_store_slotField;
            }
            set
            {
                this.col_data_store_slotField = value;
            }
        }

        /// <remarks/>
        public string col_data_store_table
        {
            get
            {
                return this.col_data_store_tableField;
            }
            set
            {
                this.col_data_store_tableField = value;
            }
        }
    }

    /// <remarks/>
    [System.SerializableAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://gpsgate.com/xml/")]
    public partial class TemplatesTemplateObjectObjectDataQuery
    {

        private string nameField;

        private string scopeIDField;

        private string queryTextField;

        private string queryTextAlt1Field;

        private string isInternalField;

        private string typeField;

        private TemplatesTemplateObjectObjectDataQueryParameter[] parametersField;

        /// <remarks/>
        public string Name
        {
            get
            {
                return this.nameField;
            }
            set
            {
                this.nameField = value;
            }
        }

        /// <remarks/>
        public string ScopeID
        {
            get
            {
                return this.scopeIDField;
            }
            set
            {
                this.scopeIDField = value;
            }
        }

        /// <remarks/>
        public string QueryText
        {
            get
            {
                return this.queryTextField;
            }
            set
            {
                this.queryTextField = value;
            }
        }

        /// <remarks/>
        public string QueryTextAlt1
        {
            get
            {
                return this.queryTextAlt1Field;
            }
            set
            {
                this.queryTextAlt1Field = value;
            }
        }

        /// <remarks/>
        public string IsInternal
        {
            get
            {
                return this.isInternalField;
            }
            set
            {
                this.isInternalField = value;
            }
        }

        /// <remarks/>
        public string Type
        {
            get
            {
                return this.typeField;
            }
            set
            {
                this.typeField = value;
            }
        }

        /// <remarks/>
        [System.Xml.Serialization.XmlArrayItemAttribute("Parameter", IsNullable = false)]
        public TemplatesTemplateObjectObjectDataQueryParameter[] Parameters
        {
            get
            {
                return this.parametersField;
            }
            set
            {
                this.parametersField = value;
            }
        }
    }

    /// <remarks/>
    [System.SerializableAttribute()]
    [System.ComponentModel.DesignerCategoryAttribute("code")]
    [System.Xml.Serialization.XmlTypeAttribute(AnonymousType = true, Namespace = "http://gpsgate.com/xml/")]
    public partial class TemplatesTemplateObjectObjectDataQueryParameter
    {

        private string type_nameField;

        private string assembly_nameField;

        private string param_nameField;

        private string multiField;

        private string value_fieldField;

        private string label_fieldField;

        private string user_def_valueField;

        private string data_typeField;

        private string default_valueField;

        /// <remarks/>
        public string type_name
        {
            get
            {
                return this.type_nameField;
            }
            set
            {
                this.type_nameField = value;
            }
        }

        /// <remarks/>
        public string assembly_name
        {
            get
            {
                return this.assembly_nameField;
            }
            set
            {
                this.assembly_nameField = value;
            }
        }

        /// <remarks/>
        public string param_name
        {
            get
            {
                return this.param_nameField;
            }
            set
            {
                this.param_nameField = value;
            }
        }

        /// <remarks/>
        public string multi
        {
            get
            {
                return this.multiField;
            }
            set
            {
                this.multiField = value;
            }
        }

        /// <remarks/>
        public string value_field
        {
            get
            {
                return this.value_fieldField;
            }
            set
            {
                this.value_fieldField = value;
            }
        }

        /// <remarks/>
        public string label_field
        {
            get
            {
                return this.label_fieldField;
            }
            set
            {
                this.label_fieldField = value;
            }
        }

        /// <remarks/>
        public string user_def_value
        {
            get
            {
                return this.user_def_valueField;
            }
            set
            {
                this.user_def_valueField = value;
            }
        }

        /// <remarks/>
        public string data_type
        {
            get
            {
                return this.data_typeField;
            }
            set
            {
                this.data_typeField = value;
            }
        }

        /// <remarks/>
        public string default_value
        {
            get
            {
                return this.default_valueField;
            }
            set
            {
                this.default_valueField = value;
            }
        }
    }

    class FuelConsumptionReportTemp
    {
    }
}
