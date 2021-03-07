<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:fo="http://www.w3.org/1999/XSL/Format"
    version="2.0">
    <xsl:template name="createFrontMatter">
        <fo:page-sequence master-reference="front-matter" background-color="#565656">
            <fo:flow flow-name="xsl-region-body">
                <fo:block xsl:use-attribute-sets="__frontmatter">

                    <!-- Cover Image -->
                    <fo:block-container xsl:use-attribute-sets="__frontmatter__title">
                        <fo:block>
                            <fo:external-graphic content-height="4cm"
                                src="url(Customization/OpenTopic/common/artwork/logo.png)"/>
                        </fo:block>
                    </fo:block-container>

                    <!-- "Pre-Title" product name -->
                    <fo:block xsl:use-attribute-sets="__frontmatter__title" margin-top="1cm">
                        Document Chat </fo:block>

                    <!-- Document Title -->
                    <fo:block xsl:use-attribute-sets="__frontmatter__title" margin-top="0">
                        <xsl:choose>
                            <xsl:when test="$map/*[contains(@class, ' topic/title ')][1]">
                                <xsl:apply-templates
                                    select="$map/*[contains(@class, ' topic/title ')][1]"/>
                            </xsl:when>
                            <xsl:when test="$map//*[contains(@class, ' bookmap/mainbooktitle ')][1]">
                                <xsl:apply-templates
                                    select="$map//*[contains(@class, ' bookmap/mainbooktitle ')][1]"
                                />
                            </xsl:when>
                            <xsl:when test="//*[contains(@class, ' map/map ')]/@title">
                                <xsl:value-of select="//*[contains(@class, ' map/map ')]/@title"/>
                            </xsl:when>
                            <xsl:otherwise>
                                <xsl:value-of
                                    select="/descendant::*[contains(@class, ' topic/topic ')][1]/*[contains(@class, ' topic/title ')]"
                                />
                            </xsl:otherwise>
                        </xsl:choose>
                    </fo:block>
                </fo:block>

                <!-- Author List: -->
                <fo:block color="#565656" text-align="center" margin-top="1cm">
                    <!--
                        1. Select all author elements (class: topic/author)
                        2. Remove duplicate values (multiple topics can have the same author => duplicates)
                        3. Join the authors with ', '
                        4. Apply the default template to these entities (text)
                    -->
                    <xsl:apply-templates
                        select="string-join(distinct-values(//*[contains(@class, ' topic/author ')]/text()), ', ')"/>
                </fo:block>

                <!-- Publication Date: -->
                <fo:block color="#565656" text-align="center" margin-top="1cm"> As of: <xsl:value-of
                        select="format-date(current-date(), '[D01].[M01].[Y0001]')"/>
                </fo:block>

            </fo:flow>
        </fo:page-sequence>
    </xsl:template>
</xsl:stylesheet>
